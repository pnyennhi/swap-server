const _ = require("lodash");
const models = require("../models");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");

class WalletController {
  async getWalletOfUser(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const wallet = await models.Wallet.findOne({
        where: { userId: userId },
      });

      return res.status(200).json(wallet);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }
}
module.exports = new WalletController();
