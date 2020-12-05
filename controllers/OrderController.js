const _ = require("lodash");
const models = require("../models");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");
const { query } = require("express");

class OrderController {
  async getAllOrders(req, res, next) {
    try {
      const { page, pageSize, id } = req.query;

      const query = { where: {} };

      if (id) {
        query.where.id = id;
      }

      const allOrders = await models.Order.findAll({
        where: query.where,
        include: [
          // { model: models.Recipient, as: "recipient" },
          // { model: models.Recipient, as: "departure" },
          { model: models.OrderItem, as: "items" },
          { model: models.User, as: "user" },
          { model: models.User, as: "seller" },
          { model: models.OrderStatus, as: "status" },
        ],
      });

      allOrders.forEach((order) => {
        const total = order.dataValues.items.reduce(
          (sum, item) => (sum += item.price * item.quantity),
          0
        );

        order.dataValues.status = order.dataValues.status.status;
        order.dataValues.total = total + Number(order.dataValues.shippingFee);
      });

      const orders =
        !page && !pageSize
          ? allOrders
          : allOrders.slice(
              pageSize * (page - 1),
              pageSize * (page - 1) + pageSize
            );

      const count = await models.Order.count();

      return res.status(200).json({ data: orders, total: count });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOneOrder(req, res) {
    try {
      const { id } = req.params;

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;
      const userRole = user.payload.roleId;

      const order = await models.Order.findOne({
        where: { id: id },
        include: [
          { model: models.User, as: "user" },
          { model: models.User, as: "seller" },
          { model: models.City, as: "shipCity" },
          { model: models.District, as: "shipDistrict" },
          { model: models.Ward, as: "shipWard" },
          { model: models.City, as: "sellerCity" },
          { model: models.District, as: "sellerDistrict" },
          { model: models.Ward, as: "sellerWard" },
          { model: models.OrderStatus, as: "status" },
          {
            model: models.OrderItem,
            as: "items",
            include: [
              {
                model: models.Product,
                as: "product",
                include: [{ model: models.ProductImage, as: "images" }],
              },
            ],
          },
        ],
      });

      if (userId != order.userId && userId != order.sellerId && userRole != 1) {
        return res.status(500).json("You don't have permission");
      }

      if (!order) {
        return res.status(200).json("Not found");
      }

      const total = order.dataValues.items.reduce(
        (sum, item) => (sum += item.price * item.quantity),
        0
      );

      order.dataValues.total = total + order.dataValues.shippingFee;

      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOrdersOfUser(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const orders = await models.Order.findAll({
        where: { userId: userId },
        order: [["id", "DESC"]],
        include: [
          { model: models.User, as: "user" },
          { model: models.User, as: "seller" },
          { model: models.City, as: "shipCity" },
          { model: models.District, as: "shipDistrict" },
          { model: models.Ward, as: "shipWard" },
          { model: models.City, as: "sellerCity" },
          { model: models.District, as: "sellerDistrict" },
          { model: models.Ward, as: "sellerWard" },
          { model: models.OrderStatus, as: "status" },
          { model: models.Review, as: "review" },
          {
            model: models.OrderItem,
            as: "items",
            include: [
              {
                model: models.Product,
                as: "product",
                include: [{ model: models.ProductImage, as: "images" }],
              },
            ],
          },
        ],
      });
      if (!orders) {
        return res.status(200).json("Not found");
      }

      orders.forEach((order) => {
        const total = order.dataValues.items.reduce(
          (sum, item) => (sum += item.price * item.quantity),
          0
        );

        order.dataValues.total = total + Number(order.dataValues.shippingFee);
      });

      return res.status(200).json(orders);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOrdersOfSeller(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const { id, statusId, page, pageSize } = req.query;

      const query = { where: {} };

      if (id) {
        query.where.id = id;
      }

      if (statusId) {
        query.where.statusId = statusId;
      }

      let orders = await models.Order.findAll({
        where: { sellerId: userId, ...query.where },
        order: [["id", "DESC"]],
        include: [
          { model: models.User, as: "user" },
          { model: models.User, as: "seller" },
          { model: models.City, as: "shipCity" },
          { model: models.District, as: "shipDistrict" },
          { model: models.Ward, as: "shipWard" },
          { model: models.City, as: "sellerCity" },
          { model: models.District, as: "sellerDistrict" },
          { model: models.Ward, as: "sellerWard" },
          { model: models.OrderStatus, as: "status" },
          {
            model: models.OrderItem,
            as: "items",
            include: [
              {
                model: models.Product,
                as: "product",
                include: [{ model: models.ProductImage, as: "images" }],
              },
            ],
          },
        ],
      });
      if (!orders) {
        return res.status(200).json("Not found");
      }

      orders.forEach((order) => {
        const total = order.dataValues.items.reduce(
          (sum, item) => (sum += item.price * item.quantity),
          0
        );

        order.dataValues.total = total + Number(order.dataValues.shippingFee);
      });

      const total = orders.length;

      if (page && pageSize) {
        orders = orders.slice((page - 1) * pageSize, page * pageSize);
      }

      return res.status(200).json({ data: orders, total: total });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async adminGetOrdersOfUser(req, res) {
    try {
      const { userId } = req.params;

      const orders = await models.Order.findAll({
        where: { userId: userId },
        include: [
          { model: models.Recipient, as: "recipient" },
          { model: models.OrderItem, as: "items" },
        ],
      });
      if (!orders) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(orders);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getStatisticOfSeller(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const all = await models.Order.count({ where: { sellerId: userId } });
      const paymentWaiting = await models.Order.count({
        where: { sellerId: userId, statusId: 1 },
      });
      const acceptWaiting = await models.Order.count({
        where: { sellerId: userId, statusId: 2 },
      });
      const pickupWaiting = await models.Order.count({
        where: { sellerId: userId, statusId: 3 },
      });
      const delivering = await models.Order.count({
        where: { sellerId: userId, statusId: 4 },
      });
      const done = await models.Order.count({
        where: { sellerId: userId, statusId: 5 },
      });
      const cancel = await models.Order.count({
        where: { sellerId: userId, statusId: 6 },
      });

      return res
        .status(200)
        .json([
          paymentWaiting,
          acceptWaiting,
          pickupWaiting,
          delivering,
          done,
          cancel,
        ]);
    } catch (error) {}
  }

  async createOrder(req, res, next) {
    try {
      const { items } = req.body;

      await (async function () {
        items.forEach(async (item) => {
          const product = await models.Product.findOne({
            where: { id: item.productId },
          });

          if (product.soldQuantity === product.quantity) {
            return res.status(500).json("This product is sold out");
          }
        });
      })();

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const recipient = await models.Recipient.findOne({
        where: { id: req.body.recipientId },
      });

      req.body.shipCityId = recipient.cityId;
      req.body.shipDistrictId = recipient.districtId;
      req.body.shipWardId = recipient.wardId;
      req.body.shipAddress = recipient.address;
      req.body.shipName = recipient.name;
      req.body.shipPhone = recipient.phone;

      const order = await models.Order.create({
        ...req.body,
        userId: userId,
      });

      req.body.orderId = order.dataValues.id;
      req.body.userId = userId;

      next();

      // return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async acceptOrder(req, res) {
    try {
      const { id } = req.params;

      const { departureId } = req.body;

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const sellerId = user.payload.id;

      const order = await models.Order.findOne({ where: { id: Number(id) } });

      if (order.sellerId != sellerId) {
        return res.status(500).json("You don't have permission");
      }

      const sellerAddress = await models.Recipient.findOne({
        where: { id: departureId },
      });

      order.statusId = 3;
      order.sellerCityId = sellerAddress.cityId;
      order.sellerDistrictId = sellerAddress.districtId;
      order.sellerWardId = sellerAddress.wardId;
      order.sellerAddress = sellerAddress.address;
      order.sellerName = sellerAddress.name;
      order.sellerPhone = sellerAddress.phone;

      if (order.save()) {
        return res.status(200).json(order);
      }

      return res.status(500).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async rejectOrder(req, res, next) {
    try {
      const { id } = req.params;

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const order = await models.Order.findOne({
        where: { id: Number(id) },
        include: [{ model: models.OrderItem, as: "items" }],
      });

      if (order.sellerId != userId && order.userId !== userId) {
        return res.status(500).json("You don't have permission");
      }

      const oldStatusId = order.statusId;

      order.statusId = 6;

      if (order.save()) {
        if (order.paymentMethod === "paypal" && oldStatusId !== 1) {
          const total = order.dataValues.items.reduce(
            (sum, item) => (sum += item.price * item.quantity),
            0
          );
          const wallet = await models.Wallet.findOne({
            where: { userId: order.userId },
          });

          wallet.amount =
            Number(wallet.dataValues.amount) +
            total +
            Number(order.shippingFee);
          await wallet.save();

          const transaction = await models.Transaction.create({
            walletId: wallet.id,
            orderId: order.id,
            amount: total + Number(order.shippingFee),
            type: "refund",
            status: "success",
          });
        }

        next();
      }
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateOrder(req, res, next) {
    try {
      const { id } = req.params;

      const order = await models.Order.findOne({
        where: { id: Number(id) },
        include: [{ model: models.OrderItem, as: "items" }],
      });

      // if (req.body.statusId == 2 || req.body.statusId == 6) {
      //   return res.status(500).json("You don't have permission");
      // }

      order.statusId = req.body.statusId;

      if (order.save()) {
        if (req.body.statusId === 5) {
          const total = order.dataValues.items.reduce(
            (sum, item) => (sum += item.price * item.quantity),
            0
          );
          const wallet = await models.Wallet.findOne({
            where: { userId: order.sellerId },
          });
          const transaction = await models.Transaction.create({
            walletId: wallet.id,
            orderId: order.id,
            amount: total,
            type: "deposit",
            status: "success",
          });
          wallet.amount = Number(wallet.dataValues.amount) + Number(total);
          await wallet.save();
          return res.status(200).json(transaction);
        } else if (req.body.statusId === 6) {
          return next();
        }

        return res.status(200).json(order);
      } else return res.status(500).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateMethod(req, res) {
    try {
      const { id } = req.params;

      const order = await models.Order.findOne({ where: { id: Number(id) } });

      if (order.statusId !== 1) {
        return res.status(500).json("You don't have permission");
      }

      order.paymentMethod = req.body.paymentMethod;
      if (req.body.paymentMethod === "cod") order.statusId = 1;

      if (order.save()) {
        return res.status(200).json(order);
      } else return res.status(500).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getRevenueOfSeller(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const { start, end } = req.query;

      const orders = await models.Order.findAll({
        where: { sellerId: userId, statusId: 4 },
        order: [["id", "DESC"]],
        include: [
          { model: models.User, as: "user" },
          { model: models.OrderStatus, as: "status" },
          {
            model: models.OrderItem,
            as: "items",
            include: [
              {
                model: models.Product,
                as: "product",
              },
            ],
          },
        ],
      });
      if (!orders) {
        return res.status(200).json("Not found");
      }

      let revenue = 0;

      orders.forEach((order) => {
        const total = order.dataValues.items.reduce(
          (sum, item) => (sum += item.price * item.quantity),
          0
        );

        order.dataValues.total = total;
        revenue += total;
      });

      return res.status(200).json({ orders, revenue });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

module.exports = new OrderController();
