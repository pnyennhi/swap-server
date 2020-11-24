"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shipping.init(
    {
      name: DataTypes.STRING,
      baseFee: DataTypes.DECIMAL(10, 2),
      feePerUnit: DataTypes.DECIMAL(10, 2),
      minForFree: DataTypes.DECIMAL(10, 2),
      minTime: DataTypes.INTEGER,
      maxTime: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Shipping",
    }
  );
  return Shipping;
};
