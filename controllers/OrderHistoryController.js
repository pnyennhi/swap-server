const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("../config/app");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");
const models = require("../models");

class OrderHistoryController {
  // async getAllUsers(req, res) {
  //   try {
  //     const { page, pageSize, sort, criteria, keyword } = req.query;

  //     const query = {};

  //     query.offset = pageSize && page ? pageSize * (page - 1) : 0;
  //     query.limit = pageSize ? parseInt(pageSize) : null;
  //     query.order =
  //       criteria && sort ? [[criteria, sort]] : [["createdAt", "desc"]];

  //     const users = await User.findAll({
  //       include: [{ model: Role, as: "role" }],
  //       // attributes: [
  //       //   "id",
  //       //   "username",
  //       //   "email",
  //       //   "roleId",
  //       //   "role",
  //       //   "createdAt",
  //       //   "isActive",
  //       // ],
  //       ...query,
  //     });
  //     if (!users) {
  //       return res.status(200).json("Not found");
  //     }

  //     const count = await User.count();

  //     return res.status(200).json({ data: users, total: count });
  //   } catch (error) {
  //     return res.status(400).json(error.message);
  //   }
  // }

  // async getOneUser(req, res) {
  //   try {
  //     const { id } = req.params;

  //     const user = await User.findOne({
  //       where: { id: Number(id) },
  //       include: [
  //         { model: Role, as: "role" },
  //         { model: Product, as: "products" },
  //       ],
  //     });

  //     const totalProducts = await Product.count({
  //       where: { ownerId: user.id },
  //     });

  //     user.dataValues.totalProducts = totalProducts;

  //     if (!user) {
  //       return res.status(200).json("Not found");
  //     }

  //     // user.dataValues.role = user.role.role;

  //     return res.status(200).json(user);
  //   } catch (error) {
  //     return res.status(400).json(error.message);
  //   }
  // }

  // async getAllReviews(req, res) {
  //   try {
  //     const { sellerId, page, pageSize } = req.query;

  //     const query = { where: {} };

  //     if (sellerId) {
  //       query.where.sellerId = sellerId;
  //     }

  //     query.offset = pageSize && page ? pageSize * (page - 1) : 0;
  //     query.limit = pageSize ? parseInt(pageSize) : null;

  //     const reviews = await models.Review.findAll({
  //       ...query,
  //       include: [
  //         { model: models.User, as: "user" },
  //         { model: models.User, as: "seller" },
  //       ],
  //     });

  //     const total = await models.Review.count({ where: query.where });

  //     return res.status(200).json({ data: reviews, total: total });
  //   } catch (err) {
  //     return res.status(400).json(err);
  //   }
  // }

  async getOrderHistoryOfOrder(req, res) {
    try {
      const history = await models.OrderHistory.findAll({
        where: { orderId: req.params.id },
      });

      res.status(200).json(history);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createOrderHistory(req, res, next) {
    try {
      const history = await models.OrderHistory.create(req.body);

      const detail = req.body.detail;
      const orderId = req.body.orderId;
      let nextStatusId, hasLeft, hasArrived;

      if (detail.includes("Đã lấy hàng")) {
        nextStatusId = 4;
      } else if (detail.includes("Lấy hàng thất bại")) {
        nextStatusId = 7;
      } else if (detail.includes("Rời kho")) {
        hasLeft = true;
      } else if (detail.includes("Đến kho")) {
        hasArrived = true;
      } else if (detail.includes("Giao hàng thành công")) {
        nextStatusId = 5;
      } else if (detail.includes("Giao hàng thất bại")) {
        nextStatusId = 7;
      } else if (detail.includes("Đã hoàn hàng thành công")) {
        nextStatusId = 10;
      }

      const order = await models.Order.findOne({ where: { id: orderId } });

      // if (nextStatusId) order.statusId = nextStatusId;
      if (hasLeft) order.hasLeft = hasLeft;
      else if (hasArrived) order.hasArrived = hasArrived;

      await order.save();
      if (nextStatusId) {
        req.params.id = req.body.orderId;
        req.body.statusId = nextStatusId;
        return next();
      }

      // if (nextStatusId === 6) {
      //   const total = order.dataValues.items.reduce(
      //     (sum, item) => (sum += item.price * item.quantity),
      //     0
      //   );
      //   const wallet = await models.Wallet.findOne({
      //     where: { userId: order.sellerId },
      //   });
      //   const transaction = await models.Transaction.create({
      //     walletId: wallet.id,
      //     orderId: order.id,
      //     amount: total,
      //     type: "deposit",
      //     status: "success",
      //   });
      //   wallet.amount = Number(wallet.dataValues.amount) + Number(total);
      //   await wallet.save();
      // } else if (nextStatusId === 7) {
      //   req.params.id = orderId;
      //   req.body.order = order;
      //   return next();
      // }

      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new OrderHistoryController();
