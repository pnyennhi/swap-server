"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Shippings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      baseFee: {
        type: Sequelize.DECIMAL(10, 2),
      },
      feePerUnit: {
        type: Sequelize.DECIMAL(10, 2),
      },
      minForFree: {
        type: Sequelize.DECIMAL(10, 2),
      },
      minTime: {
        type: Sequelize.INTEGER,
      },
      maxTime: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Shippings");
  },
};
