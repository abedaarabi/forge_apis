const { FetchFunction } = require("./fetchFunction");
const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");
const { flatten, delay } = require("./helper");
const { translationProgress } = require("./translationProgress");

async function fetchProjectMetaData() {
  let projectData = [];
  const itemsDetails = await translationProgress();
  const credentials = await oAuth2TwoLegged();

  for (let i = 0; i < itemsDetails.length; i++) {
    while (true) {
      await delay(10 * 1000);
      const items = itemsDetails[i];
      const metaData = await FetchFunction(
        `${process.env.API_ENDPOINT}modelderivative/v2/designdata/${items.derivativesId}/metadata/${items.guid}/properties?forceget=true`,
        credentials.access_token
      );
      console.log(metaData.data.collection[0]);
      if (metaData.data) {
        //log true
        projectData.push({ metaData, itemDteails: items });
        break;
      }
    }
  }
  //  await delay(10 * 1000);

  return projectData;
}

module.exports = { fetchProjectMetaData };
