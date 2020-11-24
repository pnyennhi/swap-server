"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("OrderStatuses", [
      {
        status: "Chờ thanh toán",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Chờ xác nhận",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { status: "Chờ lấy hàng", createdAt: new Date(), updatedAt: new Date() },
      {
        status: "Đang vận chuyển",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { status: "Đã giao hàng", createdAt: new Date(), updatedAt: new Date() },
      { status: "Đã hủy", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("OrderStatuses", null, {});
  },
};
