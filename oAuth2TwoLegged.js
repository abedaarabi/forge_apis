const ForgeSDK = require("forge-apis");


function oAuth2TwoLegged() {
  return new ForgeSDK.AuthClientTwoLegged(
    "7KQ4vqb7uJFWgWYgNRnhE6T5ZDnbxPcn",
    "GMgjs3ljOpfRLuMW",
    ["data:read", "data:write"],
    true
  ).authenticate();
}



module.exports = { oAuth2TwoLegged };
