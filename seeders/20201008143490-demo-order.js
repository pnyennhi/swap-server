"use strict";
const { User } = require("../models");
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const orders = [];
    orders.push({
      userId: 1,
      sellerId: 2,
      shipName: "John Doe",
      shipAddress: "1 Park ave.",
      shipCityId: "01",
      shipDistrictId: "001",
      shipWardId: "00001",
      shipPhone: "0123456789",
      sellerName: "Nhi Phan",
      sellerAddress: "Lô 9 Đa Mặn 9",
      sellerCityId: "01",
      sellerDistrictId: "001",
      sellerWardId: "00001",
      sellerPhone: "0987654321",
      shippingFee: 10,
      statusId: 1,
      paymentMethod: "cod",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert("Orders", orders, {});
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Orders", null, {}),
};
