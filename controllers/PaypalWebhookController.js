var paypal = require("paypal-rest-sdk");
const config = require("../config/app");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: config.paypal.clientId,
  client_secret: config.paypal.clientSecret,
});

// var webhook_json = {
//   url: "https://99d4df2d743e.ngrok.io/webhook",
//   event_types: [
//     {
//       name: "PAYMENT.PAYOUTS-ITEM.SUCCEEDED",
//     },
//     {
//       name: "PAYMENT.PAYOUTS-ITEM.UNCLAIMED",
//     },
//     {
//       name: "PAYMENT.PAYOUTS-ITEM.FAILED",
//     },
//   ],
// };

class PaypalWebhookController {
  webhook(req, res) {
    console.log("abc", req.body);
    // console.log(req.body);
    // paypal.notification.webhook.create(webhook_json, function (error, webhook) {
    //   if (error) {
    //     console.error(JSON.stringify(error.response));
    //     throw error;
    //   } else {
    //     console.log("Create webhook Response");
    //     console.log(webhook);
    //   }
  }
}

module.exports = new PaypalWebhookController();
