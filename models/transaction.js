"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Wallet, {
        foreignKey: "walletId",
        as: "wallet",
      });
      Transaction.belongsTo(models.Order, {
        foreignKey: "orderId",
        as: "order",
      });
    }
  }
  Transaction.init(
    {
      walletId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      paypalTransactionId: DataTypes.STRING,
      paypalPayoutId: DataTypes.STRING,
      paypalPayoutEmail: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
