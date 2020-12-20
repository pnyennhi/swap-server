"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Conditions", [
      {
        condition: "Mới (còn tag)",
        description:
          "Một mặt hàng hoàn toàn mới, chưa qua sử dụng có gắn mác hoặc trong bao bì gốc.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        condition: "Mới (không còn tag)",
        description:
          "Một mặt hàng hoàn toàn mới, chưa qua sử dụng nhưng không còn mác hoặc không còn bao bì gốc.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        condition: "Tốt",
        description:
          "Một mặt hàng đã qua sử dụng mới vài lần, chưa có khuyết điểm gì",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        condition: "Được",
        description:
          "Một mặt hàng đã qua sử dụng vài đến nhiều lần, có một số khuyết điểm nhỏ, vẫn có thể chấp nhận được",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Conditions", null, {});
  },
};
