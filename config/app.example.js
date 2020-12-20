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
    clientId:
      "AR1N8XTZdI-fGyfBCT_6ZjLLzd4pO0P2a9jGagARJRiKriPPMH7H9bQx_YHY_3pSwozQwVqXxhKWd_SK",
    clientSecret:
      "EN_P5yuijIJYQk6S3doJV30Xqkv2TJtwyDQIFOBfBRLCrTiKFmv7V05C9WWlI-YXKWxqz1FivHfxAvwX",
  },
};
