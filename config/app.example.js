// require('dotenv').config();

module.exports = {
  auth: {
    jwt_secret: "VmVyeVBvd2VyZnVsbFNlY3JldA==",
    jwt_expires_in: "1d",
    saltRounds: 10,
    refresh_token_secret: "VmVyeVBvd2VyZnVsbFNlY3JldA",
    refresh_token_expires_in: "365d",
  },
  paypal: {
    clientId: "",
    clientSecret: "",
  },
};
