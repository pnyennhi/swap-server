const paypal = require("@paypal/payouts-sdk");

const models = require("../models");
const { paypal: paypalClient } = require("../config/app");

let environment = new paypal.core.SandboxEnvironment(
  paypalClient.clientId,
  paypalClient.clientSecret
);
let client = new paypal.core.PayPalHttpClient(environment);

class PaypalPayoutController {
  async createPayout(req, res) {
    try {
      let requestBody = {
        sender_batch_header: {
          recipient_type: "EMAIL",
          email_message: "Your money has been sent from SWAP. Thank you!",
          note: "",
          sender_batch_id: `SWAP-${req.body.transactionId}`,
          email_subject: "SWAP withdrawal money",
        },
        items: [
          {
            note: `Your ${req.body.amount}$ Payout!`,
            amount: {
              currency: "USD",
              value: req.body.amount,
            },
            receiver: req.body.email,
            sender_item_id: `SWAP-payout-${req.body.transactionId}`,
          },
        ],
      };
      let request = new paypal.payouts.PayoutsPostRequest();
      request.requestBody(requestBody);

      let response = await client.execute(request);

      const payoutId = response.result.batch_header.payout_batch_id;

      const payoutItem = await (await getPayouts(payoutId)).result.items[0];
      // const payoutItem = payoutItems.items[0];

      const transaction = await models.Transaction.findOne({
        where: { id: req.body.transactionId },
      });

      transaction.paypalPayoutId = payoutId;
      transaction.paypalPayoutEmail = req.body.email;

      if (payoutItem.transaction_status === "SUCCESS") {
        transaction.status = "success";
      }

      await transaction.save();

      const wallet = await models.Wallet.findOne({
        where: { id: req.body.walletId },
      });

      console.log(req.body.walletId, wallet);

      wallet.amount = wallet.amount - req.body.amount;

      await wallet.save();

      return res.status(200).json({ transaction, wallet });
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  }
}

const getPayouts = async function (batchId) {
  request = new paypal.payouts.PayoutsGetRequest(batchId);
  request.page(1);
  request.pageSize(10);
  request.totalRequired(true);
  // Call API with your client and get a response for your call
  let response = await client.execute(request);
  return response;
  // console.log(`Response: ${JSON.stringify(response)}`);
  // // If call returns body in response, you can get the deserialized version from the result attribute of the response.
  // console.log(`Payouts Batch:`, response.result);
};

module.exports = new PaypalPayoutController();
