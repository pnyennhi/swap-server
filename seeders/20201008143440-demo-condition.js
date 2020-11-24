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
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Conditions", null, {});
  },
};
