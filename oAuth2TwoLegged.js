const ForgeSDK = require("forge-apis");
require("dotenv").config({ path: "./.env" });

function oAuth2TwoLegged() {
  return new ForgeSDK.AuthClientTwoLegged(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    ["data:read", "data:write", "data:create"],
    true
  ).authenticate();
}

module.exports = { oAuth2TwoLegged };

process.env.CLIENT_ID;
process.env.CLIENT_SECRET;
