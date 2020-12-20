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
        foreignKey: "sellerCityId",
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
      Order.hasMany(models.OrderHistory, { as: "orderHistory" });
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
      shippingFee: DataTypes.DECIMAL(10, 2),
      note: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
      statusId: DataTypes.INTEGER,
      hasLeft: DataTypes.BOOLEAN,
      hasArrived: DataTypes.BOOLEAN,
      receivedDay: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
