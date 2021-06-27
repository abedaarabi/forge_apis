const { FetchFunction } = require("./fetchFunction");
const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");

const { flatten, delay } = require("./helper");

require("dotenv").config({ path: "./.env" });

const { derivativeGuid } = require("./derivative");

async function translationProgress() {
  let allItemsProgress = [];
  let itemNotSuccess = [];
  const credentials = await oAuth2TwoLegged();
  const allItems = await derivativeGuid();

  for (let i = 0; i < allItems.length; i++) {
    while (true) {
      try {
        await delay(10 * 1000);
        const derivative = allItems[i];

        const manifest = await FetchFunction(
          `${process.env.API_ENDPOINT}modelderivative/v2/designdata/${derivative.derivativesId}/manifest`,
          credentials.access_token
        );
        console.log(manifest.progress);
        if (manifest.progress === "complete") {
          allItemsProgress.push({ manifest, itemDteails: derivative });
          break;
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  const allItemTranslatePros = allItemsProgress.map((item) => {
    return {
      ...item.itemDteails,
      translateProgress: item.manifest.progress,
      translateStatus: item.manifest.status,
    };
  });

  //Check if all item translate status is complete
  const checkItematranslateComplete = allItemTranslatePros.filter((item) => {
    if (
      item.translateProgress == "complete" &&
      item.translateStatus != "failed"
    ) {
      return true;
    } else {
      return false;
    }
  });
  console.log(checkItematranslateComplete);
  return checkItematranslateComplete;
}

module.exports = { translationProgress };
