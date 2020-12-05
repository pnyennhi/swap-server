const _ = require("lodash");
const models = require("../models");
const { Op } = require("sequelize");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");

class DashboardController {
  async getDashboard(req, res) {
    try {
      const { fromDate, toDate } = req.query;

      const query = { where: {} };
      if (fromDate && toDate) {
        query.where.createdAt = {
          [Op.between]: [new Date(fromDate), new Date(toDate)],
        };
      }

      const users = await models.User.count({
        where: { isActive: true, ...query.where },
      });
      const products = await models.Product.count({
        where: { statusId: 2, ...query.where },
      });
      const orders = await models.Order.count({
        where: { statusId: [1, 2, 3, 4, 5], ...query.where },
      });
      const completedOrders = await models.Order.count({
        where: { statusId: 5, ...query.where },
      });

      const response = [
        { title: "Người dùng", key: "user", count: users },
        { title: "Sản phẩm", key: "product", count: products },
        { title: "Đơn hàng", key: "order", count: orders },
        {
          title: "Đơn hàng hoàn thành",
          key: "completedOrder",
          count: completedOrders,
        },
      ];

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getDashboardOfUser(req, res) {
    try {
      const { fromDate, toDate } = req.query;

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const query = { where: {} };
      if (fromDate && toDate) {
        query.where.createdAt = {
          [Op.between]: [new Date(fromDate), new Date(toDate)],
        };
      }

      const products = await models.Product.count({
        where: { ownerId: userId, statusId: 2, ...query.where },
      });
      const orders = await models.Order.count({
        where: { sellerId: userId, statusId: [1, 2, 3, 4, 5], ...query.where },
      });
      const completedOrders = await models.Order.count({
        where: { sellerId: userId, statusId: 5, ...query.where },
      });

      const response = [
        { title: "Sản phẩm", key: "product", count: products },
        { title: "Đơn hàng", key: "order", count: orders },
        {
          title: "Đơn hoàn thành",
          key: "completedOrder",
          count: completedOrders,
        },
      ];

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new DashboardController();
