const { oAuth2TwoLegged, auth } = require("./oAuth2TwoLegged");
const fetch = require("node-fetch");
const { FetchFunction } = require("./fetchFunction");
const axios = require("axios");
const querystring = require("querystring");
var fs = require("fs");
const { flatten, delay } = require("./helper");
const { items } = require("./folderItems");

const { itemsDetail } = require("./itemsDetail");
const { projectDetails } = require("./projectDetails");
async function downloadItem() {
  //Create Folder for each project
  const projectsFolder = await projectDetails();
  projectsFolder.forEach((folder) => {
    fs.mkdir(
      `//Kbh-data02/kbh_data_1/2300-/3000/3000-150/BD BIM/ABMA/BIM360 Backup/${folder.projectName}`,
      () => {
        console.log("done", folder.projectName);
      }
    );
  });
  // download all project items inside its folder
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
      item.fileName.includes("K10")
    ) {
      return true;
    } else return false;
  });

  // Remove IFC from UN17_K09_F2_KON_VOID.ifc.RVT <Example>
  const removeIFC = kItems.filter((item) => item.originalItemUrn);

  for (let i = 0; i < kItems.length; i++) {
    const items = kItems[i];

    try {
      const writeStream = fs.createWriteStream(
        `//Kbh-data02/kbh_data_1/2300-/3000/3000-150/BD BIM/ABMA/BIM360 Backup/${items.projectName}/${items.fileName}`
      );

      const TOKEN = await oAuth2TwoLegged();

      const url = `${items.downloadItem}`;
      const response = await axios({
        url,
        responseType: "stream",
        headers: {
          Authorization: `Bearer ${TOKEN.access_token}`,
        },
      });
      await response.data.pipe(writeStream);
      console.log("Downloading...", items.fileName);
      writeStream.on("error", function (err) {
        console.log(err);
      });
      // console.log(response.data);
    } catch (error) {}
  }
  console.log("Done");
}

module.exports = { downloadItem };
