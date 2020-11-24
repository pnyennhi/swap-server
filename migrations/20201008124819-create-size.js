"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Sizes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      size: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Sizes");
  },
};
