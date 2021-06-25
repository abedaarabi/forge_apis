const { FetchFunction } = require("./fetchFunction");
const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");
const { items } = require("./folderItems");
const { flatten, delay } = require("./helper");
const { itemsDetail } = require("./itemsDetail");
require("dotenv").config({ path: "./.env" });

async function translationProgress() {
  let allItemsProgress = [];
  let allitems = [];
  const credentials = await oAuth2TwoLegged();
  const folderItem = await items();
  const item = await itemsDetail();
  allitems.push(item, folderItem);
  const flatfolderItem = flatten(allitems);

  for (let i = 0; i < flatfolderItem.length; i++) {
    const derivative = flatfolderItem[i];

    const manifest = await FetchFunction(
      `${process.env.API_ENDPOINT}modelderivative/v2/designdata/${derivative.derivativesId}/manifest`,
      credentials.access_token
    );
    console.log("Translation Status:", manifest.derivatives);
    allItemsProgress.push(manifest);
  }
  const flatAllItemsProgress = flatten(allItemsProgress);

  const allItemTranslatePros = flatAllItemsProgress.map((item) => {
    return { progress: item.progress, status: item.status };
  });

  const check = allItemTranslatePros.every((item) => {
    if (item.progress == "complete" && item.status == "success") {
      return true;
    } else {
      return false;
    }
  });

  return check;
}

module.exports = { translationProgress };
