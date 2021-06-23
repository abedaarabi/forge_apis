const { FetchFunction } = require("./fetchFunction");
const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");

require("dotenv").config({ path: "./.env" });

async function metadata(params) {
  const credentials = await oAuth2TwoLegged();

  const folderContents = await FetchFunction(
    `${process.env.API_ENDPOINT}modelderivative/v2/designdata/dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk0wbDJyV3BmUW1HUTZQdGYweVRQeFE_dmVyc2lvbj0y/metadata`,
    credentials.access_token
  );
  return;
}
async function guid(params) {
  const credentials = await oAuth2TwoLegged();

  const folderContents = await FetchFunction(
    `${process.env.API_ENDPOINT}modelderivative/v2/designdata/dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk0wbDJyV3BmUW1HUTZQdGYweVRQeFE_dmVyc2lvbj0y/metadata/7b8b6cd3-f54a-7537-7d62-98fc4d03060b/properties?forceget=true`,
    credentials.access_token
  );
  return;
}

module.exports = { metadata, guid };
