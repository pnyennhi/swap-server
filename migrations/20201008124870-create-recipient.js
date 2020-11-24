"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Recipients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },

      address: {
        type: Sequelize.STRING,
      },
      cityId: {
        type: Sequelize.STRING,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      districtId: {
        type: Sequelize.STRING,
        references: {
          model: "Districts",
          key: "id",
        },
      },
      wardId: {
        type: Sequelize.STRING,
        references: {
          model: "Wards",
          key: "id",
        },
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
      },
      isDeparture: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("Recipients");
  },
};
