"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Brands", [
      {
        brand: "Nike",
      },
      {
        brand: "H&M",
      },
      {
        brand: "Adidas",
      },
      {
        brand: "Zara",
      },
      {
        brand: "Uniqlo",
      },
      {
        brand: "Louis Vuitton",
      },
      {
        brand: "Chanel",
      },
      {
        brand: "Prada",
      },
      {
        brand: "Michael Kors",
      },
      {
        brand: "The North Face",
      },
      {
        brand: "Burberry",
      },
      {
        brand: "Christian Dior",
      },
      {
        brand: "Tommy Hilfiger",
      },
      {
        brand: "Puma",
      },
      {
        brand: "Balenciaga",
      },
      {
        brand: "Calvin Klein",
      },
      {
        brand: "Charles",
      },
      {
        brand: "Dolce & Gabbana",
      },
      {
        brand: "Fendi",
      },
      {
        brand: "Givenchy",
      },
      {
        brand: "Levi's",
      },
      {
        brand: "Lacoste",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Brands", null, {});
  },
};
