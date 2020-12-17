"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "SubCategories",
          key: "id",
        },
      },
      conditionId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Conditions",
          key: "id",
        },
      },
      size: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      material: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      soldQuantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      coverImage: {
        type: Sequelize.STRING,
      },
      weight: {
        type: Sequelize.DECIMAL(10, 2),
      },
      note: {
        type: Sequelize.STRING,
      },
      statusId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ProductStatuses",
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
    await queryInterface.dropTable("Products");
  },
};
