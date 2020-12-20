const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("../config/app");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");
const models = require("../models");

class RefundRequestController {
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

  async getRequestOfOrder(req, res) {
    try {
      const request = await models.RefundRequest.findAll({
        where: { orderId: req.params.id },
        include: [{ model: models.RefundImage, as: "images" }],
        order: [["createdAt", "DESC"]],
      });

      console.log(request);

      res.status(200).json(request[0]);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createRequest(req, res) {
    try {
      const request = await models.RefundRequest.create({
        ...req.body,
        status: "Đang chờ",
      });

      if (req.body.links) {
        const dataLinks = req.body.links.map((item) => ({
          link: item,
          requestId: request.dataValues.id,
          isVideo: false,
        }));

        if (req.body.video) {
          dataLinks.push({
            link: req.body.video,
            requestId: request.dataValues.id,
            isVideo: true,
          });
        }
        const links = await saveImages(dataLinks, request.dataValues.id);
      }

      const order = await models.Order.findOne({
        where: { id: req.body.orderId },
      });

      order.statusId = 8;
      order.save();

      const history = await models.OrderHistory.create({
        orderId: req.body.orderId,
        detail: "Người mua tạo yêu cầu hoàn hàng",
      });

      res.status(200).json(order);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateRequest(req, res) {
    try {
      const request = await models.RefundRequest.findOne({
        where: { id: req.params.id },
      });

      request.status = req.body.status;
      request.save();

      if (request.status === "Xác nhận") {
        const order = await models.Order.findOne({
          where: { id: request.dataValues.orderId },
        });

        order.statusId = 9;
        order.save();

        const history = await models.OrderHistory.create({
          orderId: request.dataValues.orderId,
          detail: "Yêu cầu hoàn hàng được xác nhận",
        });

        return res.status(200).json(order);
      } else if (request.status === "Từ chối") {
        const history = await models.OrderHistory.create({
          orderId: request.dataValues.orderId,
          detail: "Yêu cầu hoàn hàng bị từ chối",
        });

        const order = await models.Order.findOne({
          where: { id: Number(request.dataValues.orderId) },
          include: [{ model: models.OrderItem, as: "items" }],
        });

        var receivedDay = new Date(order.receivedDay);
        receivedDay = receivedDay.getTime();

        var preTime = new Date().getTime();
        // preTime = preTime - 3600 * 24 * 1000;
        preTime = preTime - 10 * 60 * 1000;

        if (receivedDay < preTime) {
          order.statusId = 6;
          order.save();

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
        } else {
          order.statusId = 5;
          order.save();
        }
      }
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}

async function saveImages(links, requestId) {
  const oldImages = await models.RefundImage.findAll({
    where: { requestId: requestId },
  });

  const oldImageIds = oldImages.map((item) => item.dataValues.id);

  oldImageIds.forEach(async (id) => {
    const image = await models.RefundImage.destroy({ where: { id: id } });
  });

  const res = [];
  links.forEach(async (item) => {
    const image = await models.RefundImage.create(item);
    res.push(image);
  });

  return res;
}

module.exports = new RefundRequestController();
