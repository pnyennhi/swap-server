const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("../config/app");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");
const { User, Role, Product, Wallet, Review } = require("../models");

class UserController {
  async getProfile(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const account = jwt.decode(tokenFromHeader);

      const user = await User.findOne({
        where: { id: account.payload.id, isActive: true },
        include: [{ model: Role, as: "role" }],
      });

      if (!user) {
        return res.status(400).json("Not found");
      }

      const data = _.omit(user.dataValues, [
        "password, isAcitve, createdAt, updatedAt",
      ]);

      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getAllUsers(req, res) {
    try {
      const { page, pageSize, sort, criteria, keyword } = req.query;

      const query = {};

      query.offset = pageSize && page ? pageSize * (page - 1) : 0;
      query.limit = pageSize ? parseInt(pageSize) : null;
      query.order =
        criteria && sort ? [[criteria, sort]] : [["createdAt", "desc"]];

      const users = await User.findAll({
        include: [{ model: Role, as: "role" }],
        // attributes: [
        //   "id",
        //   "username",
        //   "email",
        //   "roleId",
        //   "role",
        //   "createdAt",
        //   "isActive",
        // ],
        ...query,
      });
      if (!users) {
        return res.status(200).json("Not found");
      }

      const count = await User.count();

      return res.status(200).json({ data: users, total: count });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOneUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findOne({
        where: { id: Number(id) },
        include: [{ model: Role, as: "role" }],
      });

      const totalProducts = await Product.count({
        where: { ownerId: user.id },
      });

      user.dataValues.totalProducts = totalProducts;

      if (!user) {
        return res.status(200).json("Not found");
      }

      // user.dataValues.role = user.role.role;

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOwnerInfo(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findOne({
        where: { id: Number(id), isActive: true },
      });

      if (!user) {
        return res.status(500).json("Not found");
      }

      const totalActiveProducts = await Product.count({
        where: { ownerId: user.id, statusId: 2 },
      });

      const reviews = await Review.findAll({ where: { sellerId: id } });

      const rate =
        reviews.length > 0
          ? reviews.reduce((acc, review) => (acc += review.rate), 0) /
            reviews.length
          : 0;

      user.dataValues.totalActiveProducts = totalActiveProducts;
      user.dataValues.rate = (Math.round(rate * 2) / 2).toFixed(1);
      user.dataValues.totalReviews = reviews.length;

      const data = _.omit(user.dataValues, [
        "password",
        "phone",
        "createdAt",
        "updatedAt",
        "isActive",
      ]);

      // user.dataValues.role = user.role.role;

      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createUser(req, res) {
    try {
      let user;
      // TODO: validate username
      user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        return res.status(500).json("Username existed");
      }

      const data = req.body;
      data.roleId = 2;
      data.isActive = true;
      data.password = bcrypt.hashSync(data.password, config.auth.saltRounds);

      user = await User.create(data);

      const userId = user.dataValues.id;

      // const wallet = await Wallet.create({ userId: userId, amount: 0 });

      res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createAdmin(req, res) {
    try {
      let user;
      // TODO: validate username
      user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        return res.status(500).json("Username existed");
      }

      const data = req.body;
      data.roleId = 1;
      data.isActive = true;
      data.password = bcrypt.hashSync(data.password, config.auth.saltRounds);

      user = await User.create(data);

      res.status(200).json(user);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;

      const user = await User.findOne({
        where: { id: Number(id) },
      });

      user.username = body.username;
      user.phone = body.phone;
      user.avatarImage = body.avatarImage;
      user.coverImage = body.coverImage;

      if (user.save()) {
        return res.status(200).json(user);
      }

      res.status(400).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async updateProfile(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      let user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const body = req.body;

      user = await User.findOne({
        where: { id: Number(userId) },
      });

      user.username = body.username;
      user.phone = body.phone;
      user.avatarImage = body.avatarImage;
      user.coverImage = body.coverImage;

      if (user.save()) {
        return res.status(200).json(user);
      }

      res.status(400).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({
        where: { id: Number(id) },
      });

      user.isActive = false;

      if (user.save()) {
        const products = await Product.findAll({ where: { ownerId: user.id } });

        products.forEach((product) => {
          product.isActive = false;
          product.save();
        });

        res.status(200).json(user);
      }

      res.status(400).json("Error");
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new UserController();
