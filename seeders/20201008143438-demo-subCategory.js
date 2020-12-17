"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("SubCategories", [
      {
        subCategory: "Áo ngắn tay",
        path: "thoi-trang-nam/ao-ngan-tay",
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subCategory: "Áo dài tay",
        path: "thoi-trang-nam/ao-dai-tay",
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subCategory: "Áo sơ mi",
        path: "thoi-trang-nam/ao-so-mi",
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subCategory: "Đầm",
        path: "thoi-trang-nu/dam",
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subCategory: "Chân váy",
        path: "thoi-trang-nu/chan-vay",
        parentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subCategory: "Áo ngắn tay",
        path: "thoi-trang-be-trai/ao-ngan-tay",
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subCategory: "Áo dài tay",
        path: "thoi-trang-be-trai/ao-dai-tay",
        parentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subCategory: "Đầm",
        path: "thoi-trang-be-gai/dam",
        parentId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        subCategory: "Chân váy",
        path: "thoi-trang-be-gai/chan-vay",
        parentId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("SubCategories", null, {});
  },
};
