"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Wards", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      ward: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      districtId: {
        type: Sequelize.STRING,
        references: {
          model: "Districts",
          key: "id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Wards");
  },
};
