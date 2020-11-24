const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("../config/app");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");
const models = require("../models");

class ReviewController {
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

  async getAllReviews(req, res) {
    try {
      const { sellerId, page, pageSize } = req.query;

      const query = { where: {} };

      if (sellerId) {
        query.where.sellerId = sellerId;
      }

      query.offset = pageSize && page ? pageSize * (page - 1) : 0;
      query.limit = pageSize ? parseInt(pageSize) : null;

      const reviews = await models.Review.findAll({
        ...query,
        include: [{ model: models.User, as: "user" }],
      });

      const total = await models.Review.count({ where: query.where });

      return res.status(200).json({ data: reviews, total: total });
    } catch (err) {
      return res.status(400).json(err);
    }
  }

  async createReview(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      let user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const review = await models.Review.create({
        ...req.body,
        userId: userId,
      });

      res.status(200).json(review);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new ReviewController();
