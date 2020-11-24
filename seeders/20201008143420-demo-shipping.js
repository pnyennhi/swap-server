"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Shippings", [
      {
        name: "Giao hàng tiêu chuẩn",
        baseFee: 5,
        feePerUnit: 0.5,
        minForFree: 50,
        minTime: 3,
        maxTime: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Shippings", null, {});
  },
};
