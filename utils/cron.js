var CronJob = require("cron").CronJob;
var models = require("../models");
var job = new CronJob(
  "0 * * * * *",
  function () {
    models.Order.findAll({ where: { statusId: 7 } })
      .then((orders) => {
        for (var i = 0; i < orders.length; i++) {
          var createdTime = new Date(orders[i].createdAt);
          createdTime = createdTime.getTime();

          var preTime = new Date().getTime();
          // preTime = preTime - 3600 * 24 * 1000;
          preTime = preTime - 2 * 60 * 1000;

          if (createdTime < preTime) {
            console.log(orders[i].id);
            orders[i].statusId = 6;
            orders[i].save();
          }
        }
      })
      .catch((err) => console.log(err));
  },
  null,
  true,
  "America/Los_Angeles"
);

module.exports = job;
