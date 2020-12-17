"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: "ownerId",
        as: "owner",
      });
      Product.belongsTo(models.SubCategory, {
        foreignKey: "subCategoryId",
        as: "category",
      });
      Product.belongsTo(models.Condition, {
        foreignKey: "conditionId",
        as: "condition",
      });
      Product.hasMany(models.ProductImage, { as: "images" });
      Product.belongsTo(models.ProductStatus, {
        foreignKey: "statusId",
        as: "status",
      });
    }
  }
  Product.init(
    {
      ownerId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      subCategoryId: DataTypes.INTEGER,
      conditionId: DataTypes.INTEGER,
      size: DataTypes.STRING,
      brand: DataTypes.STRING,
      material: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      soldQuantity: DataTypes.INTEGER,
      coverImage: DataTypes.STRING,
      price: DataTypes.DECIMAL(10, 2),
      weight: DataTypes.DECIMAL(10, 2),
      note: DataTypes.STRING,
      statusId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
