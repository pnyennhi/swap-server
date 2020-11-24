"use strict";
const { User } = require("../models");
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const products = [];
    for (let index = 0; index < 100; index++) {
      products.push({
        ownerId:
          users[Math.floor(Math.random() * (users.length - 1 - 0 + 1) + 0)].id,
        name: `Product ${index}`,
        description: `Description ${index}`,
        subCategoryId: 1,
        conditionId: 1,
        size: "S",
        brand: "Nike",
        material: "Cotton",
        quantity: 1,
        soldQuantity: 0,
        price: 20,
        weight: index % 9,
        coverImage:
          "https://images.vinted.net/thumbs/f800/01_00892_Su9zi1g1KZw7URCNksaa6pmA.jpeg?1602627645-ecdd43e36816122389209ea1214474eb59448ba7",
        statusId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Products", products, {});
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Products", null, {}),
};
