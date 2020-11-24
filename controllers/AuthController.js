const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const models = require("../models");
const config = require("../config/app");

class AuthController {
  async loginUser(req, res) {
    try {
      const options = {
        where: {
          email: req.body.email,
          roleId: 2,
          isActive: true,
        },
      };
      const user = await models.User.findOne(options);
      if (!user) {
        return res.status(400).json({ message: "Email không tồn tại" });
      }
      let isCorrect = false;
      await bcrypt.compare(req.body.password, user.password).then((result) => {
        isCorrect = result;
      });
      if (!isCorrect) {
        return res.status(400).json({ message: "Mật khẩu không đúng" });
      }
      const payload = _.omit(user.dataValues, [
        "password",
        // "one_time_password",
        // "one_time_password_period",
        "isActive",
        "createdAt",
        "updatedAt",
      ]);
      const token = jwt.sign({ payload }, config.auth.jwt_secret, {
        expiresIn: config.auth.jwt_expires_in,
        algorithm: "HS512",
      });
      const refreshToken = jwt.sign(
        { payload },
        config.auth.refresh_token_secret,
        {
          expiresIn: config.auth.refresh_token_expires_in,
          algorithm: "HS512",
        }
      );
      const dataResponse = {
        token,
        refreshToken,
      };
      // tokenList[refreshToken] = dataResponse;
      return res.status(200).json(dataResponse);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async loginAdmin(req, res) {
    try {
      const options = {
        where: {
          email: req.body.email,
          roleId: 1,
          isActive: true,
        },
      };
      const user = await models.User.findOne(options);
      if (!user) {
        return res.status(400).json({ message: "Email không tồn tại" });
      }
      let isCorrect = false;
      await bcrypt.compare(req.body.password, user.password).then((result) => {
        isCorrect = result;
      });
      if (!isCorrect) {
        return res.status(400).json({ message: "Mật khẩu không đúng" });
      }
      const payload = _.omit(user.dataValues, [
        "password",
        // "one_time_password",
        // "one_time_password_period",
        "isActive",
        "createdAt",
        "updatedAt",
      ]);
      const token = jwt.sign({ payload }, config.auth.jwt_secret, {
        expiresIn: config.auth.jwt_expires_in,
        algorithm: "HS512",
      });
      const refreshToken = jwt.sign(
        { payload },
        config.auth.refresh_token_secret,
        {
          expiresIn: config.auth.refresh_token_expires_in,
          algorithm: "HS512",
        }
      );
      const dataResponse = {
        token,
        refreshToken,
      };
      // tokenList[refreshToken] = dataResponse;
      return res.status(200).json(dataResponse);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new AuthController();
