"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Materials", [
      {
        material: "Cotton",
      },
      {
        material: "Thun",
      },
      {
        material: "Jeans",
      },
      {
        material: "Len đan",
      },
      {
        material: "Len tăm",
      },
      {
        material: "Dệt kim",
      },
      {
        material: "Len acrylic",
      },
      {
        material: "Lụa",
      },
      {
        material: "Nhung",
      },
      {
        material: "Da",
      },
      {
        material: "Lanh",
      },
      {
        material: "Lưới",
      },
      {
        material: "Satin",
      },
      {
        material: "Polyeste",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Materials", null, {});
  },
};
