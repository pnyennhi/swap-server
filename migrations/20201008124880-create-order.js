"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
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
      sellerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      shipName: {
        type: Sequelize.STRING,
      },
      shipAddress: {
        type: Sequelize.STRING,
      },
      shipPhone: {
        type: Sequelize.STRING,
      },
      shipCityId: {
        type: Sequelize.STRING,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      shipDistrictId: {
        type: Sequelize.STRING,
        references: {
          model: "Districts",
          key: "id",
        },
      },
      shipWardId: {
        type: Sequelize.STRING,
        references: {
          model: "Wards",
          key: "id",
        },
      },
      sellerName: {
        type: Sequelize.STRING,
      },
      sellerAddress: {
        type: Sequelize.STRING,
      },
      sellerPhone: {
        type: Sequelize.STRING,
      },
      sellerCityId: {
        type: Sequelize.STRING,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      sellerDistrictId: {
        type: Sequelize.STRING,
        references: {
          model: "Districts",
          key: "id",
        },
      },
      sellerWardId: {
        type: Sequelize.STRING,
        references: {
          model: "Wards",
          key: "id",
        },
      },
      note: {
        type: Sequelize.STRING,
      },
      paymentMethod: {
        type: Sequelize.STRING,
      },
      shippingFee: { type: Sequelize.INTEGER },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: "OrderStatuses",
          key: "id",
        },
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
    await queryInterface.dropTable("Orders");
  },
};
