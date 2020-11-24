"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 1; i <= 100; i++) {
      users.push({
        productId: (i % 7) + 1,
        imageLink:
          "https://images.vinted.net/thumbs/f800/01_00892_Su9zi1g1KZw7URCNksaa6pmA.jpeg?1602627645-ecdd43e36816122389209ea1214474eb59448ba7",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("ProductImages", users);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ProductImages", null, {});
  },
};
