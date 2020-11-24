"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recipient.belongsTo(models.City, {
        foreignKey: "cityId",
        as: "city",
      });
      Recipient.belongsTo(models.District, {
        foreignKey: "districtId",
        as: "district",
      });
      Recipient.belongsTo(models.Ward, {
        foreignKey: "wardId",
        as: "ward",
      });
    }
  }
  Recipient.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      wardId: DataTypes.INTEGER,
      districtId: DataTypes.STRING,
      cityId: DataTypes.STRING,
      isDefault: DataTypes.BOOLEAN,
      isDeparture: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Recipient",
    }
  );
  return Recipient;
};
