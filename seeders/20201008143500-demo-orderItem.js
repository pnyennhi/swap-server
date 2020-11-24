"use strict";
const { User } = require("../models");
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const orders = [];
    orders.push({
      orderId: 1,
      productId: 1,
      price: 50,
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    orders.push({
      orderId: 1,
      productId: 2,
      price: 50,
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert("OrderItems", orders, {});
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("OrderItems", null, {}),
};
