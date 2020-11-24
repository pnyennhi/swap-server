"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Cities", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Cities");
  },
};
