"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubCategory.belongsTo(models.Category, {
        foreignKey: "parentId",
        as: "parent",
      });
    }
  }
  SubCategory.init(
    {
      subCategory: DataTypes.STRING,
      path: DataTypes.STRING,
      parentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SubCategory",
    }
  );
  return SubCategory;
};
