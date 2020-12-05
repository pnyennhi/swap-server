"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.hasMany(models.Transaction, {
        foreignKey: "walletId",
        as: "transactions",
      });
    }
  }
  Wallet.init(
    {
      userId: DataTypes.INTEGER,
      amount: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};
