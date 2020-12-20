"use strict";
const bcrypt = require("bcrypt");
const config = require("../config/app");
const { isAdmin } = require("../utils/auth");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [
      {
        username: `David Nguyễn`,
        email: `davidnguyen@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage: "https://randomuser.me/api/portraits/men/76.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Trần Nam`,
        email: `trannam@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage: "https://randomuser.me/api/portraits/men/85.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Lê Ngọc Ngân`,
        email: `nganlen@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage:
          "http://thenewcode.com/assets/images/thumbnails/sarah-parmenter.jpeg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Peter Hoyer`,
        email: `peterhoyer@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage:
          "https://i.pinimg.com/564x/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Jade Hoyer`,
        email: `jạdehoyer@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage: "https://randomuser.me/api/portraits/women/82.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Thanh Huyền`,
        email: `thanhhuyen@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage: "https://randomuser.me/api/portraits/women/85.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Chi Nguyễn`,
        email: `chinguyen@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage:
          "https://i.pinimg.com/236x/d0/20/02/d0200242ae4c2d9d7c052a63bffa2ebc.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Chu Ngọc Trân`,
        email: `chungoctran@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage:
          "https://i.pinimg.com/564x/de/64/80/de64801f0275c1ab2ea5a9e2bb3ce7bc.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Minh Ngọc`,
        email: `minhngoc@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage:
          "https://i.pinimg.com/236x/d8/07/2c/d8072c4f7237dc9c38e0f1591342f577.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Nhi Nguyễn`,
        email: `nhinguyen@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage:
          "https://i.pinimg.com/236x/7b/ee/dc/7beedce149d72bf7538a5d991c9ae23d.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Minh Hoàng Phan`,
        email: `minhhoang@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage: "https://randomuser.me/api/portraits/men/34.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Trần Linh Chi`,
        email: `linhchitran@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage: "https://static.toiimg.com/photo/76729750.cms",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Trần Nhã Phương`,
        email: `nhaphuong@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzl8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8MnwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Hin Pháp`,
        email: `davidnguyen@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage: "https://static.toiimg.com/photo/76729750.cms",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Đinh Hoàng Long`,
        email: `hoanglong@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage: "https://randomuser.me/api/portraits/men/29.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Mỹ Tâm`,
        email: `mytam@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage:
          "https://media-cdn.laodong.vn/Storage/NewsPortal/2020/8/25/830872/My-Tam.jpg?w=414&h=276&crop=auto&scale=both",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Đàm Vĩnh Hưng`,
        email: `damvinhhung@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage:
          "https://photo-cms-plo.zadn.vn/w653/Uploaded/2020/pwvouqvp/2019_10_18/dam-vinh-hung-thump_qblr.jpg",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: `Admin`,
        email: `admin@example.com`,
        password: bcrypt.hashSync(`123456`, config.auth.saltRounds),
        avatarImage: "https://static.toiimg.com/photo/76729750.cms",
        coverImage:
          "https://img.thuthuatphanmem.vn/uploads/2018/09/19/anh-bia-facebook-cuc-dep-22_105256956.jpg",
        phone: "0123456789",
        roleId: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert("Users", users);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
