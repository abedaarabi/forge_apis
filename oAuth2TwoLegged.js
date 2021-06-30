const ForgeSDK = require("forge-apis");
const fetch = require("node-fetch");
require("dotenv").config({ path: "./.env" });
const axios = require("axios");
function oAuth2TwoLegged() {
  return new ForgeSDK.AuthClientTwoLegged(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    ["data:read", "data:create", "data:write"],
    true
  ).authenticate();
}

async function auth() {
  const auothUrl =
    "https://developer.api.autodesk.com/authentication/v1/authenticate";
  try {
    const response = await axios({
      url: auothUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: process.env.tokenBody,
    });

    return response;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { oAuth2TwoLegged, auth };
