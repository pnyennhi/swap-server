"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RefundImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RefundImage.init(
    {
      requestId: DataTypes.INTEGER,
      link: DataTypes.STRING,
      isVideo: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "RefundImage",
    }
  );
  return RefundImage;
};
