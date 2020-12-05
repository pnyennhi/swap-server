const _ = require("lodash");
const models = require("../models");

class ShippingController {
  async getAllShippings(req, res) {
    try {
      const { pageSize, page, sort, criteria } = req.query;
      const query = { where: {} };

      query.offset = pageSize && page ? pageSize * (page - 1) : 0;
      query.limit = pageSize ? parseInt(pageSize) : null;
      query.order =
        criteria && sort && criteria !== "owner"
          ? [[criteria, sort]]
          : [["createdAt", "desc"]];
      const shippings = await models.Shipping.findAll({ ...query });

      const total = await models.Shipping.count();

      return res.status(200).json({ data: shippings, total });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOneShipping(req, res) {
    try {
      const { id } = req.params;

      const shipping = await models.Shipping.findOne({
        where: { id: id },
      });
      if (!shipping) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(shipping);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async calcShippingFee(req, res) {
    try {
      const { items } = req.body;

      let weight = 0;
      let total = 0;
      let soldItems = [];
      let sellerId = null;

      await (async function () {
        items.forEach(async (item) => {
          const product = await models.Product.findOne({
            where: { id: item.productId },
          });

          sellerId = product.ownerId;

          if (product.soldQuantity === product.quantity) {
            soldItems.push(product.id);
          } else {
            weight += product.weight * item.quantity;
            total += product.price;
          }
        });
      })();

      const shipping = await models.Shipping.findOne({ where: { id: 1 } });

      const shippingFee =
        total >= shipping.minForFree
          ? 0
          : Number(shipping.baseFee) + Number(weight * shipping.feePerUnit);

      return res.status(200).json({ shippingFee, soldItems, sellerId });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateShiping(req, res) {
    try {
      const { id } = req.params;

      const shipping = await models.Shipping.findOne({
        where: { id: id },
      });
      if (!shipping) {
        return res.status(500).json("Not found");
      }

      shipping.name = req.body.name;
      shipping.baseFee = req.body.baseFee;
      shipping.feePerUnit = req.body.feePerUnit;
      shipping.minForFree = req.body.minForFree;
      shipping.minTime = req.body.minTime;
      shipping.maxTime = req.body.maxTime;

      await shipping.save();

      return res.status(200).json(shipping);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new ShippingController();
