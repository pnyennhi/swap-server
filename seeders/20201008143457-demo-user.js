"use strict";
const bcrypt = require("bcrypt");
const config = require("../config/app");
const { isAdmin } = require("../utils/auth");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [];
    for (let i = 1; i <= 100; i++) {
      users.push({
        username: `user${i}`,
        email: `user${i}@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage: "https://static.toiimg.com/photo/76729750.cms",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: i % 7 === 0 ? 1 : 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    users.push({
      username: "admin",
      email: "admin@gmail.com",
      password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
      phone: "0123456789",
      avatarImage: "https://static.toiimg.com/photo/76729750.cms",
      coverImage:
        "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
      roleId: 1,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return queryInterface.bulkInsert("Users", users);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
