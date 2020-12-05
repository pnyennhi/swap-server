"use strict";
const bcrypt = require("bcrypt");
const config = require("../config/app");
const { isAdmin } = require("../utils/auth");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Wallets = [];
    for (let i = 1; i <= 100; i++) {
      Wallets.push({
        userId: i,
        amount: 70,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    // Wallets.push({
    //   username: "admin",
    //   email: "admin@gmail.com",
    //   password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
    //   phone: "0123456789",
    //   avatarImage: "https://static.toiimg.com/photo/76729750.cms",
    //   coverImage:
    //     "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
    //   roleId: 1,
    //   isActive: true,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // });

    return queryInterface.bulkInsert("Wallets", Wallets);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Wallets", null, {});
  },
};
