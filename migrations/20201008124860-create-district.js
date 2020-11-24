"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Districts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      district: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      cityId: {
        type: Sequelize.STRING,
        references: {
          model: "Cities",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Districts");
  },
};
