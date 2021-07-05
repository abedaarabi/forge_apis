const ForgeSDK = require("forge-apis");

const { FetchFunction } = require("./fetchFunction");
const { Hub } = require("./Hub");
require("dotenv").config({ path: "./.env" });

async function projects() {
  const hubId = await Hub();

  const projects = await FetchFunction(
    `${process.env.API_ENDPOINT}project/v1/hubs/${hubId}/projects`
  );

  return projects.data;
}

module.exports = { projects };
