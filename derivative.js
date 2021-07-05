const { FetchFunction } = require("./fetchFunction");

const { items } = require("./folderItems");
const { flatten, delay } = require("./helper");
const { itemsDetail } = require("./itemsDetail");
require("dotenv").config({ path: "./.env" });
const { translationProgress } = require("./translationProgress");

async function derivativeGuid() {
  let guidSene = [];

  const allItems = await translationProgress();

  try {
    for (let i = 0; i < allItems.length; i++) {
      const derivative = allItems[i];

      const guidContents = await FetchFunction(
        `${process.env.API_ENDPOINT}modelderivative/v2/designdata/${derivative.derivativesId}/metadata`
      );

      const roles3d = guidContents.data.metadata.filter((item) => {
        if (item.role === "3d" && item.name === "New Construction") {
          return true;
        }
      });
      console.log("fetching view name and guid", derivative.fileName);
      guidSene.push({ roles3d, derivative });
    }

    const guids = guidSene.map((item) => {
      return item.roles3d.map((guid) => {
        return {
          vieweName: guid.name,
          role: guid.role,
          guid: guid.guid,
          ...item.derivative,
        };
      });
    });
    const flatguidSene = flatten(guids);
    return flatguidSene;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { derivativeGuid };
