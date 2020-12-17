const _ = require("lodash");
const models = require("../models");
const auth = require("../utils/auth");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class TransactionController {
  async getAllTransactions(req, res, next) {
    try {
      const { page, pageSize, fromDate, toDate, id } = req.query;

      const query = { where: {} };

      const allTransactions = await models.Transaction.findAll({
        where: query.where,
      });

      const transactions =
        !page && !pageSize
          ? allTransactions
          : allTransactions.slice(
              pageSize * (page - 1),
              pageSize * (page - 1) + pageSize
            );

      const count = await models.Transaction.count();

      return res.status(200).json({ data: transactions, total: count });
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getOneTransaction(req, res) {
    try {
      const { id } = req.params;

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;
      const userRole = user.payload.roleId;

      const transaction = await models.Transaction.findOne({
        where: { id: id },
        include: [{ model: models.Wallet, as: "wallet" }],
      });

      if (userId != transaction.userId && userRole != 1) {
        return res.status(500).json("You don't have permission");
      }

      if (!transaction) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async getTransactionsOfUser(req, res) {
    try {
      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const { fromDate, toDate } = req.query;

      const query = { where: {} };

      if (fromDate && toDate) {
        console.log("date", fromDate, toDate);
        query.where.createdAt = {
          [Op.between]: [new Date(fromDate), new Date(toDate)],
        };
      }

      const wallet = await models.Wallet.findOne({ where: { userId: userId } });

      const walletId = wallet.dataValues.id;

      const transactions = await models.Transaction.findAll({
        where: { walletId: walletId, ...query.where },
        order: [["id", "DESC"]],
      });

      if (!transactions) {
        return res.status(200).json("Not found");
      }

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  async createTransaction(req, res, next) {
    try {
      const { orderId, type, amount, email } = req.body;

      const tokenFromHeader = auth.getJwtToken(req);
      const user = jwt.decode(tokenFromHeader);
      const userId = user.payload.id;

      const wallet = await models.Wallet.findOne({
        where: { userId: userId },
      });

      const walletId = wallet.dataValues.id;

      const transaction = await models.Transaction.create({
        walletId: Number(walletId),
        type,
        amount,
        status: type === "withdraw" ? "pending" : "success",
        orderId: orderId ?? null,
        paypalPayoutEmail: email,
      });

      req.body.transactionId = transaction.id;
      req.body.walletId = walletId;

      if (type === "withdraw") {
        return next();
      }
      if (type === "deposit") {
        return res.status(200).json(transaction);
      }

      // return res.status(200).json(transaction);
    } catch (error) {
      return res.status(400).json(error.message);
    }
  }

  // async acceptTransaction(req, res) {
  //   try {
  //     const { id } = req.params;

  //     const { departureId } = req.body;

  //     const tokenFromHeader = auth.getJwtToken(req);
  //     const user = jwt.decode(tokenFromHeader);
  //     const sellerId = user.payload.id;

  //     const transaction = await models.Transaction.findOne({
  //       where: { id: Number(id) },
  //     });

  //     if (transaction.sellerId != sellerId) {
  //       return res.status(500).json("You don't have permission");
  //     }

  //     const sellerAddress = await models.Recipient.findOne({
  //       where: { id: departureId },
  //     });

  //     transaction.statusId = 2;
  //     transaction.sellerCityId = sellerAddress.cityId;
  //     transaction.sellerDistrictId = sellerAddress.districtId;
  //     transaction.sellerWardId = sellerAddress.wardId;
  //     transaction.sellerAdress = sellerAddress.address;
  //     transaction.sellerName = sellerAddress.name;
  //     transaction.sellerPhone = sellerAddress.phone;

  //     if (transaction.save()) {
  //       return res.status(200).json(transaction);
  //     }

  //     return res.status(500).json("Error");
  //   } catch (error) {
  //     return res.status(400).json(error.message);
  //   }
  // }

  // async rejectTransaction(req, res, next) {
  //   try {
  //     const { id } = req.params;

  //     const tokenFromHeader = auth.getJwtToken(req);
  //     const user = jwt.decode(tokenFromHeader);
  //     const sellerId = user.payload.id;

  //     const transaction = await models.Transaction.findOne({
  //       where: { id: Number(id) },
  //     });

  //     if (transaction.sellerId != sellerId) {
  //       return res.status(500).json("You don't have permission");
  //     }

  //     transaction.statusId = 5;

  //     if (transaction.save()) {
  //       next();
  //     }
  //   } catch (error) {
  //     return res.status(400).json(error.message);
  //   }
  // }

  async updateSuccessfulTransaction(paypalPayoutId, paypalTransactionId) {
    try {
      // const { paypalPayoutId } = req.body;

      const transaction = await models.Transaction.findOne({
        where: { paypalPayoutId: paypalPayoutId },
      });

      transaction.status = "success";
      transaction.note = null;
      transaction.paypalTransactionId = paypalTransactionId;

      await transaction.save();
    } catch (error) {
      throw error;
    }
  }

  async updateFailedTransaction(paypalPayoutId, paypalTransactionId) {
    try {
      // const { paypalPayoutId } = req.body;

      const transaction = await models.Transaction.findOne({
        where: { paypalPayoutId: paypalPayoutId },
      });

      transaction.status = "fail";
      transaction.note = null;
      transaction.paypalTransactionId = paypalTransactionId;

      await transaction.save();

      // TODO: update wallet amount
    } catch (error) {
      throw error;
    }
  }

  async updateUnclaimedTransaction(paypalPayoutId, paypalTransactionId) {
    try {
      // const { paypalPayoutId } = req.body;

      const transaction = await models.Transaction.findOne({
        where: { paypalPayoutId: paypalPayoutId },
      });

      transaction.status = "unclaimed";
      transaction.note =
        "Email này chưa đăng kí Paypal. Bạn vui lòng đăng kí Paypal và claim yêu cầu rút tiền. Sau 30 ngày (kể từ ngày yêu cầu rút tiền) nếu không claim, yêu cầu rút tiền này sẽ thất bại";
      transaction.paypalTransactionId = paypalTransactionId;

      await transaction.save();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TransactionController();
