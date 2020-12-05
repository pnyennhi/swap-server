var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var paypal = require("paypal-rest-sdk");
const config = require("./config/app");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: config.paypal.clientId,
  client_secret: config.paypal.clientSecret,
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var productsRouter = require("./routes/products");
var conditionsRouter = require("./routes/conditions");
var citiesRouter = require("./routes/cities");
var districtsRouter = require("./routes/districts");
var wardsRouter = require("./routes/wards");
var recipientsRouter = require("./routes/recipients");
var ordersRouter = require("./routes/orders");
var orderStatusRouter = require("./routes/orderStatus");
var categoriesRouter = require("./routes/categories");
var subCategoriesRouter = require("./routes/subCategories");
var wishlistsRouter = require("./routes/wishlists");
var cartRouter = require("./routes/cart");
var productStatusRouter = require("./routes/productStatus");
var transactionsRouter = require("./routes/transactions");
var walletsRouter = require("./routes/wallets");
var reviewsRouter = require("./routes/reviews");
var shippingRouter = require("./routes/shipping");
var brandRouter = require("./routes/brand");
var sizeRouter = require("./routes/size");
var dashboardRouter = require("./routes/dashboard");

var transactionController = require("./controllers/TransactionController");

var app = express();

app.use(cors());
app.options("*", cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./utils/cron");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/conditions", conditionsRouter);
app.use("/cities", citiesRouter);
app.use("/districts", districtsRouter);
app.use("/wards", wardsRouter);
app.use("/recipients", recipientsRouter);
app.use("/orders", ordersRouter);
app.use("/orderStatus", orderStatusRouter);
app.use("/categories", categoriesRouter);
app.use("/subCategories", subCategoriesRouter);
app.use("/wishlist", wishlistsRouter);
app.use("/cart", cartRouter);
app.use("/productStatus", productStatusRouter);
app.use("/transactions", transactionsRouter);
app.use("/wallet", walletsRouter);
app.use("/reviews", reviewsRouter);
app.use("/shipping", shippingRouter);
app.use("/brands", brandRouter);
app.use("/sizes", sizeRouter);
app.use("/dashboard", dashboardRouter);

app.post("/webhook", async (req, res) => {
  // console.log("app", req.body);
  const type = req.body.event_type;
  const paypalPayoutId = req.body.resource.payout_batch_id;
  const paypalTransactionId = req.body.resource.transaction_id;

  console.log(type, paypalPayoutId, req.body);
  switch (type) {
    case "PAYMENT.PAYOUTS-ITEM.SUCCEEDED":
      await transactionController.updateSuccessfulTransaction(
        paypalPayoutId,
        paypalTransactionId
      );
      break;
    case "PAYMENT.PAYOUTS-ITEM.UNCLAIMED":
      await transactionController.updateUnclaimedTransaction(
        paypalPayoutId,
        paypalTransactionId
      );
      break;
    case "PAYMENT.PAYOUTS-ITEM.FAILED":
      await transactionController.updateFailedTransaction(
        paypalPayoutId,
        paypalTransactionId
      );
      break;
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
