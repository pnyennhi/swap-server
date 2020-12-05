const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("../config/app");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const sequelize = require("sequelize");
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
      const {
        page,
        pageSize,
        sort,
        criteria,
        keyword,
        orderBy,
        isActive,
      } = req.query;

      const query = { where: {} };

      query.offset = pageSize && page ? pageSize * (page - 1) : 0;
      query.limit = pageSize ? parseInt(pageSize) : null;
      query.order =
        criteria && sort ? [[criteria, sort]] : [["createdAt", "desc"]];

      if (keyword) {
        query.where = {
          [Op.or]: [
            {
              username: {
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              email: {
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
          roleId: 2,
        };
      }

      if (isActive) {
        query.where.isActive = true;
      }

      let users;

      if (!orderBy) {
        users = await User.findAll({
          include: [{ model: Role, as: "role" }],
          ...query,
        });
        if (!users) {
          return res.status(200).json("Not found");
        }
      } else {
        users = await User.findAll({
          include: [{ model: Role, as: "role" }],
          where: query.where,
        });
      }

      await (async function () {
        users.forEach(async (user) => {
          const products = await Product.findAll({
            where: { ownerId: user.id },
          });

          const soldQuantity = products.reduce(
            (acc, item) => (acc += item.dataValues.soldQuantity),
            0
          );

          user.dataValues.soldQuantity = soldQuantity;
        });
      })();

      await (async function () {
        users.forEach(async (user) => {
          const totalProducts = await Product.count({
            where: { ownerId: user.id, statusId: 2 },
          });

          user.dataValues.totalProducts = totalProducts;
        });
      })();

      await (async function () {
        for (const user of users) {
          const reviews = await Review.findAll({
            where: { sellerId: user.id },
          });

          const rate =
            reviews.length > 0
              ? reviews.reduce((acc, review) => (acc += review.rate), 0) /
                reviews.length
              : 0;
          user.dataValues.rate =
            rate === 0 ? 0 : Number((Math.round(rate * 2) / 2).toFixed(1));
        }
      })();

      const count = await User.count({ ...query });

      if (orderBy) {
        switch (orderBy) {
          case "rate":
            users.sort((a, b) => b.dataValues.rate - a.dataValues.rate);
            break;
          case "sold":
            users.sort(
              (a, b) => b.dataValues.soldQuantity - a.dataValues.soldQuantity
            );
            break;
        }

        users = users.slice((page - 1) * pageSize, page * pageSize);
      }

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
      user.dataValues.rate =
        rate === 0 ? 0 : (Math.round(rate * 2) / 2).toFixed(1);
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
        return res.status(500).json("Email đã tồn tại");
      }

      const data = req.body;
      data.roleId = 2;
      data.isActive = true;
      data.password = bcrypt.hashSync(data.password, config.auth.saltRounds);

      user = await User.create(data);

      const userId = user.dataValues.id;

      const wallet = await Wallet.create({ userId: userId, amount: 0 });

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
        return res.status(500).json("Email đã tồn tại");
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

  async updatePassword(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      let user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const body = req.body;

      user = await User.findOne({
        where: { id: Number(userId) },
      });

      console.log(body.oldPassword);

      let isCorrect = false;
      await bcrypt.compare(req.body.password, user.password).then((result) => {
        isCorrect = result;
      });
      if (!isCorrect) {
        return res.status(400).json({ message: "Mật khẩu cũ không đúng" });
      }

      user.password = bcrypt.hashSync(body.password, config.auth.saltRounds);

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
