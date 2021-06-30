const ForgeSDK = require("forge-apis");
const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");
const { FetchFunction } = require("./fetchFunction");
const { Hub } = require("./Hub");
require("dotenv").config({ path: "./.env" });

async function projects() {
  const credentials = await oAuth2TwoLegged();
  const hubId = await Hub();

  const projects = await FetchFunction(
    `${process.env.API_ENDPOINT}project/v1/hubs/${hubId}/projects`,
    credentials.access_token
  );

  return projects.data;
}

module.exports = { projects };
