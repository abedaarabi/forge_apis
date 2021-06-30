const axios = require("axios");
const ForgeSDK = require("forge-apis");

require("dotenv").config({ path: "./.env" });

function oAuth2TwoLegged() {
  return new ForgeSDK.AuthClientTwoLegged(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    ["data:create", "data:read"],
    true
  ).authenticate();
}

async function publishModel() {
  const credentials = await oAuth2TwoLegged();
  const urnId = "urn:adsk.wipprod:dm.lineage:mF7-c5plRv6MunMkeSOt-Q";

  const url = `https://developer.api.autodesk.com/data/v1/projects/b.79a6bff3-34b1-435f-8964-282f78ae1ef5/commands`;
  const response = await axios({
    method: "post",
    url,
    headers: {
      "content-type": "application/vnd.api+json",
      Authorization: `Bearer ${credentials.access_token}`,
      "x-user-id": "e8e4e102-13d1-493d-b448-4b14365ecb89",
    },
    data: JSON.stringify({
      jsonapi: {
        version: "1.0",
      },
      data: {
        type: "commands",
        attributes: {
          extension: {
            type: "commands:autodesk.bim360:C4RModelPublish",
            version: "1.0.0",
          },
        },
        relationships: {
          resources: {
            data: [
              {
                type: "items",
                id: urnId,
              },
            ],
          },
        },
      },
    }),
  });
  console.log(response);
  return response;
}

module.exports = { publishModel };
