"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        category: "Thời trang nam",
        path: "thoi-trang-nam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Thời trang nữ",
        path: "thoi-trang-nu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Thời trang bé trai",
        path: "thoi-trang-be trai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: "Thời trang bé gái",
        path: "thoi-trang-be-gai",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
