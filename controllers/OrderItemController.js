const _ = require("lodash");
const models = require("../models");

class OrderController {
  async createOrderItems(req, res) {
    try {
      const { items, orderId, userId } = req.body;

      const resItems = [];
      await (async function () {
        items.forEach(async (item) => {
          const product = await models.Product.findOne({
            where: { id: item.productId },
          });

          product.soldQuantity = product.soldQuantity + 1;

          if (product.dataValues.quantity === product.soldQuantity)
            product.statusId = 3;

          await product.save();

          const orderItem = await models.OrderItem.create({
            productId: item.productId,
            quantity: item.quantity,
            orderId: orderId,
            price: product.dataValues.price,
          });

          resItems.push(orderItem);

          const cartItem = await models.Cart.destroy({
            where: { productId: product.dataValues.id, userId: userId },
          });
        });
      })();

      return res.status(200).json({ ...req.body, items: resItems });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async rejectOrderItem(req, res) {
    try {
      const { id } = req.params;

      const items = await models.OrderItem.findAll({ where: { orderId: id } });

      await (async function () {
        items.forEach(async (item) => {
          const product = await models.Product.findOne({
            where: { id: item.productId },
          });

          product.soldQuantity = product.soldQuantity - 1;

          product.statusId = 2;

          await product.save();
        });
      })();

      return res.status(200).json(req.body.order);
    } catch (err) {
      return res.status(400).json(err.message);
    }
  }
}

module.exports = new OrderController();
