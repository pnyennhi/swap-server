"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Sizes", [
      {
        size: "XS",
        categoryId: 1,
      },
      {
        size: "S",
        categoryId: 1,
      },
      {
        size: "M",
        categoryId: 1,
      },
      {
        size: "L",
        categoryId: 1,
      },
      {
        size: "XL",
        categoryId: 1,
      },
      {
        size: "XXL",
        categoryId: 1,
      },
      {
        size: "3XL",
        categoryId: 1,
      },
      {
        size: "28",
        categoryId: 1,
      },
      {
        size: "29",
        categoryId: 1,
      },
      {
        size: "30",
        categoryId: 1,
      },
      {
        size: "31",
        categoryId: 1,
      },
      {
        size: "32",
        categoryId: 1,
      },
      {
        size: "33",
        categoryId: 1,
      },
      {
        size: "34",
        categoryId: 1,
      },
      {
        size: "XS",
        categoryId: 2,
      },
      {
        size: "S",
        categoryId: 2,
      },
      {
        size: "M",
        categoryId: 2,
      },
      {
        size: "L",
        categoryId: 2,
      },
      {
        size: "XL",
        categoryId: 2,
      },
      {
        size: "XXL",
        categoryId: 2,
      },
      {
        size: "3XL",
        categoryId: 2,
      },
      {
        size: "26",
        categoryId: 2,
      },
      {
        size: "27",
        categoryId: 2,
      },
      {
        size: "28",
        categoryId: 2,
      },
      {
        size: "29",
        categoryId: 2,
      },
      {
        size: "30",
        categoryId: 2,
      },
      {
        size: "31",
        categoryId: 2,
      },
      {
        size: "32",
        categoryId: 2,
      },
      {
        size: "0-3 months",
        categoryId: 3,
      },
      {
        size: "3 - 6 months",
        categoryId: 3,
      },
      {
        size: "6 - 9 months",
        categoryId: 3,
      },
      {
        size: "9 - 12 months",
        categoryId: 3,
      },
      {
        size: "12 - 18 months",
        categoryId: 3,
      },
      {
        size: "18 - 24 months",
        categoryId: 3,
      },
      {
        size: "24 - 36 months",
        categoryId: 3,
      },
      {
        size: "3 - 4 years",
        categoryId: 3,
      },
      {
        size: "5 - 6 years",
        categoryId: 3,
      },
      {
        size: "7 - 8 years",
        categoryId: 3,
      },
      {
        size: "9 - 10 years",
        categoryId: 3,
      },
      {
        size: "11 - 12 years",
        categoryId: 3,
      },
      {
        size: "13 - 14 years",
        categoryId: 3,
      },
      {
        size: "0-3 months",
        categoryId: 4,
      },
      {
        size: "3 - 6 months",
        categoryId: 4,
      },
      {
        size: "6 - 9 months",
        categoryId: 4,
      },
      {
        size: "9 - 12 months",
        categoryId: 4,
      },
      {
        size: "12 - 18 months",
        categoryId: 4,
      },
      {
        size: "18 - 24 months",
        categoryId: 4,
      },
      {
        size: "24 - 36 months",
        categoryId: 4,
      },
      {
        size: "3 - 4 years",
        categoryId: 4,
      },
      {
        size: "5 - 6 years",
        categoryId: 4,
      },
      {
        size: "7 - 8 years",
        categoryId: 4,
      },
      {
        size: "9 - 10 years",
        categoryId: 4,
      },
      {
        size: "11 - 12 years",
        categoryId: 4,
      },
      {
        size: "13 - 14 years",
        categoryId: 4,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Sizes", null, {});
  },
};
