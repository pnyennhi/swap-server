"use strict";
const { User } = require("../models");
module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: async (queryInterface, Sequelize) => {
    const recipients = [];
    recipients.push({
      userId: 1,
      name: "John Robert",
      phone: "0123455667",
      address: "1200 Park ave.",
      cityId: "01",
      districtId: "001",
      wardId: "00001",
      isDefault: true,
      isDeparture: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    recipients.push({
      userId: 1,
      name: "John Robert",
      phone: "0123455667",
      address: "01 Park ave.",
      cityId: "01",
      districtId: "001",
      wardId: "00004",
      isDefault: false,
      isDeparture: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert("Recipients", recipients, {});
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Recipients", null, {}),
};
