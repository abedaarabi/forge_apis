const { FetchFunction } = require("./fetchFunction");
const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");
const { items } = require("./folderItems");
const { flatten, delay } = require("./helper");
const { itemsDetail } = require("./itemsDetail");
require("dotenv").config({ path: "./.env" });

async function derivativeGuid() {
  let guidSene = [];
  let allitems = [];
  const credentials = await oAuth2TwoLegged();
  const folderItem = await items();
  const item = await itemsDetail();
  allitems.push(item, folderItem);
  const flatfolderItem = flatten(allitems);

  try {
    for (let i = 0; i < flatfolderItem.length; i++) {
      const derivative = flatfolderItem[i];

      const guidContents = await FetchFunction(
        `${process.env.API_ENDPOINT}modelderivative/v2/designdata/${derivative.derivativesId}/metadata`,
        credentials.access_token
      );

      const roles3d = guidContents.data.metadata.filter((item) => {
        if (item.role === "3d" && item.name === "New Construction") {
          return true;
        }
      });
      console.log("Feting view name and guid", derivative.fileName);
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
