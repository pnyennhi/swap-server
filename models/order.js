"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Order.belongsTo(models.User, {
        foreignKey: "sellerId",
        as: "seller",
      });
      Order.belongsTo(models.City, {
        foreignKey: "shipCityId",
        as: "shipCity",
      });
      Order.belongsTo(models.District, {
        foreignKey: "shipDistrictId",
        as: "shipDistrict",
      });
      Order.belongsTo(models.Ward, {
        foreignKey: "shipWardId",
        as: "shipWard",
      });
      Order.belongsTo(models.City, {
        foreignKey: "shipCityId",
        as: "sellerCity",
      });
      Order.belongsTo(models.District, {
        foreignKey: "sellerDistrictId",
        as: "sellerDistrict",
      });
      Order.belongsTo(models.Ward, {
        foreignKey: "sellerWardId",
        as: "sellerWard",
      });
      Order.belongsTo(models.OrderStatus, {
        foreignKey: "statusId",
        as: "status",
      });
      Order.hasOne(models.Review, {
        foreignKey: "id",
        as: "review",
      });
      Order.hasMany(models.OrderItem, { as: "items" });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      shipName: DataTypes.STRING,
      shipAddress: DataTypes.STRING,
      shipCityId: DataTypes.STRING,
      shipDistrictId: DataTypes.STRING,
      shipWardId: DataTypes.STRING,
      shipPhone: DataTypes.STRING,
      sellerName: DataTypes.STRING,
      sellerAddress: DataTypes.STRING,
      sellerCityId: DataTypes.STRING,
      sellerDistrictId: DataTypes.STRING,
      sellerWardId: DataTypes.STRING,
      sellerPhone: DataTypes.STRING,
      shippingFee: DataTypes.INTEGER,
      note: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
      statusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};