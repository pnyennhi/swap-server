var CronJob = require("cron").CronJob;
var models = require("../models");
var job = new CronJob(
  "0 * * * * *",
  function () {
    models.Order.findAll({ where: { statusId: 1 } })
      .then(async (orders) => {
        for (const order of orders) {
          var createdTime = new Date(order.createdAt);
          createdTime = createdTime.getTime();

          var preTime = new Date().getTime();
          // preTime = preTime - 3600 * 24 * 1000;
          preTime = preTime - 2 * 60 * 1000;

          if (createdTime < preTime) {
            console.log(orders[i].id);
            order.statusId = 7;
            order.save();

            await models.OrderHistory.create({
              orderId: order.id,
              detail: "Đơn hàng của bạn đã bị hủy. Lý do: Quá hạn thanh toán",
            });
          }
        }
      })
      .catch((err) => console.log(err));

    models.Order.findAll({
      where: { statusId: 5 },
      include: [{ model: models.OrderItem, as: "items" }],
    })
      .then(async (orders) => {
        for (const order of orders) {
          var createdTime = new Date(order.receivedDay);
          createdTime = createdTime.getTime();

          var preTime = new Date().getTime();
          // preTime = preTime - 3600 * 24 * 1000;
          preTime = preTime - 10 * 60 * 1000;

          if (createdTime < preTime) {
            console.log(order.id);
            order.statusId = 6;
            order.save();

            const total = order.dataValues.items.reduce(
              (sum, item) => (sum += item.price * item.quantity),
              0
            );
            const wallet = await models.Wallet.findOne({
              where: { userId: order.sellerId },
            });
            const transaction = await models.Transaction.create({
              walletId: wallet.id,
              orderId: order.id,
              amount: total,
              type: "deposit",
              status: "success",
            });
            wallet.amount = Number(wallet.dataValues.amount) + Number(total);
            await wallet.save();
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
