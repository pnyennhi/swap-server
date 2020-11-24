// require('dotenv').config();

module.exports = {
  // app: {
  // 	port: process.env.DEV_APP_PORT || 8080,
  // 	appName: process.env.APP_NAME || 'LikeALocal',
  // 	env: process.env.NODE_ENV || 'development',
  // },
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
  // mail: {
  // 	driver: process.env.MAIL_DRIVER || 'smtp',
  // 	host: process.env.MAIL_HOST || 'smtp.gmail.com',
  // 	port: process.env.MAIL_PORT || 587,
  // 	from_name: process.env.MAIL_FROM_NAME || 'LikeALocal System',
  // 	username: process.env.MAIL_USERNAME || 'likealocalsys@gmail.com',
  // 	password: process.env.MAIL_PASSWORD || '',
  // 	encryption: process.env.MAIL_ENCRYPTION || 'tls',
  // },
};
