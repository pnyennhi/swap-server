"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RefundRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RefundRequest.hasMany(models.RefundImage, {
        as: "images",
        foreignKey: "requestId",
      });
    }
  }
  RefundRequest.init(
    {
      orderId: DataTypes.INTEGER,
      detail: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RefundRequest",
    }
  );
  return RefundRequest;
};
