const { FetchFunction } = require("./fetchFunction");
const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");

const { flatten, delay } = require("./helper");

require("dotenv").config({ path: "./.env" });
const { items } = require("./folderItems");

const { itemsDetail } = require("./itemsDetail");

async function translationProgress() {
  const credentials = await oAuth2TwoLegged();

  let allItemsProgress = [];
  let allitems = [];
  const folderItem = await items();
  const item = await itemsDetail();
  allitems.push(item, folderItem);

  const flatAllItems = flatten(allitems);

  // return only K07 K08 K09
  const kItems = flatAllItems.filter((item) => {
    if (
      item.fileName.includes("K07") ||
      item.fileName.includes("K08") ||
      item.fileName.includes("K09")
    ) {
      return true;
    } else return false;
  });

  // Remove IFC from UN17_K09_F2_KON_VOID.ifc.RVT <Example>
  const removeIFC = kItems.filter((item) => item.originalItemUrn);

  for (let i = 0; i < removeIFC.length; i++) {
    while (true) {
      try {
        const derivative = removeIFC[i];

        // await delay(5 * 1000);
        const manifest = await FetchFunction(
          `${process.env.API_ENDPOINT}modelderivative/v2/designdata/${derivative.derivativesId}/manifest`
        );

        // return manifest;
        if (manifest.progress != "complete") {
          await delay(10 * 1000);
          console.log(
            "waitin for translation to finish: ",
            derivative.fileName
          );
          continue;
        } else if (manifest.progress === "complete") {
          console.log("Translate progress complete: ", derivative.fileName);
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
  // console.log(checkItematranslateComplete);
  return checkItematranslateComplete;
}

module.exports = { translationProgress };
