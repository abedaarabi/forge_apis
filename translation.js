const axios = require("axios");
const ForgeSDK = require("forge-apis");
const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");
require("dotenv").config({ path: "./.env" });

const fs = require("fs");
const result = fs.readFileSync(__dirname + "/token.txt");
const TOKEN = JSON.parse(result.toString()).access_token;

async function publishModel() {
  const credentials = await oAuth2TwoLegged();
  const urnId = "urn:adsk.wipprod:dm.lineage:jgVScQVsQqOXZhHGGqazEw";

  const url = `https://developer.api.autodesk.com/data/v1/projects/b.79a6bff3-34b1-435f-8964-282f78ae1ef5/commands`;
  const response = await axios({
    method: "post",
    url,
    headers: {
      "content-type": "application/vnd.api+json",
      Authorization: `Bearer ${credentials.access_token}`,
      "x-user-id": "G37HRH22DWBV",
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
                id: urnId,
                type: "items",
              },
            ],
          },
        },
      },
    }),
  });
  console.log(response.data);
  return response.data;
}

module.exports = { publishModel };

//200703030286415 Jesper
//4RL5NPRJ3LNM bimadmin
//G37HRH22DWBV Abed
//A4CZNLQVA864 Anita

// Documentation🧮
/****
//  *https://forge.autodesk.com/en/docs/data/v2/tutorials/publish-model/
 * 
 * 
 * to check  type: "commands:autodesk.bim360:C4RModelGetPublishJob",
 f you have published the latest version, the status attribute is set to processing or complete
 * {
  jsonapi: { version: '1.0' },
  data: {
    type: 'commands',
    id: '793ee840-f421-4bb9-8670-9015017e0290',
    attributes: { status: 'complete', extension: [Object] }     
  }
}
 "type": "commands:autodesk.bim360:C4RModelPublish",
if  "data": null
If you have updated the central model, the data attribute is set to null until you publish it.

{
  "jsonapi": {
    "version": "1.0"
  },
  "data": null
}
 * 
 * 
 * 
 * *****/
