"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Review.belongsTo(models.User, {
        foreignKey: "sellerId",
        as: "seller",
      });
      Review.belongsTo(models.Order, {
        foreignKey: "orderId",
        as: "order",
      });
    }
  }
  Review.init(
    {
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      rate: DataTypes.INTEGER,
      review: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
