"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      walletId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Wallets",
          key: "id",
        },
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      paypalTransactionId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paypalPayoutId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paypalPayoutEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      amount: {
        type: Sequelize.DECIMAL(10, 2),
      },
      type: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Transactions");
  },
};
