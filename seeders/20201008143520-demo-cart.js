"use strict";
const { User } = require("../models");
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const cart = [];
    cart.push({
      userId: 1,
      productId: 1,
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // cart.push({
    //   userId: 1,
    //   productId: 26,
    //   quantity: 1,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });
    return queryInterface.bulkInsert("Carts", cart, {});
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Carts", null, {}),
};
