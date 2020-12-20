"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ProductStatuses", [
      {
        status: "Chờ duyệt",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Đang hoạt động",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: "Bán hết",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { status: "Bị từ chối", createdAt: new Date(), updatedAt: new Date() },
      { status: "Bị khóa", createdAt: new Date(), updatedAt: new Date() },
      { status: "Bị xóa", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ProductStatuses", null, {});
  },
};
