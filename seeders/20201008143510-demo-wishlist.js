"use strict";
const { User } = require("../models");
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const wishlist = [];
    wishlist.push({
      userId: 1,
      productId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // wishlist.push({
    //   userId: 1,
    //   productId: 2,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });
    return queryInterface.bulkInsert("Wishlists", wishlist, {});
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Wishlists", null, {}),
};
