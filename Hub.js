const ForgeSDK = require("forge-apis");
const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");
const { FetchFunction } = require("./fetchFunction");
require("dotenv").config({ path: "./.env" });
async function Hub() {
  try {
    const credentials = await oAuth2TwoLegged();
    const HubId = await FetchFunction(
      `${process.env.API_ENDPOINT}project/v1/hubs`,
      credentials.access_token
    );

    return await HubId.data[0].id;
  } catch (error) {
    console.log(error.message);
  }
}

Hub();

module.exports = { Hub };
