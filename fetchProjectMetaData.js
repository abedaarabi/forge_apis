const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");
const { flatten, delay } = require("./helper");
const { derivativeGuid } = require("./derivative");
const fetch = require("node-fetch");
require("dotenv").config({ path: "./.env" });

async function fetchProjectMetaData() {
  const TOKEN = await oAuth2TwoLegged();
  let projectData = [];
  const itemsDetails = await derivativeGuid();

  for (let i = 0; i < itemsDetails.length; i++) {
    while (true) {
      const items = itemsDetails[i];
      try {
        const response = await fetch(
          `${process.env.API_ENDPOINT}modelderivative/v2/designdata/${items.derivativesId}/metadata/${items.guid}/properties?forceget=true`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TOKEN.access_token}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const metaData = await response.json();
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          throw new Error(message);
        } else if (response.status === 202) {
          console.log(
            ` Status:${response.status} Preparing json data for model`,
            items.fileName
          );
          await delay(5 * 1000);
          continue;
        } else {
          console.log(
            ` Status:${response.status} Getting json data for model`,
            items.fileName
          );
          projectData.push({ metaData, itemDteails: items });
          // await delay(15 * 1000);
          break;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return projectData;
}

module.exports = { fetchProjectMetaData };
