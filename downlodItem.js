const { oAuth2TwoLegged, auth } = require("./oAuth2TwoLegged");
const fetch = require("node-fetch");
const { FetchFunction } = require("./fetchFunction");
const axios = require("axios");
const ProgressBar = require("progress");
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
    fs.mkdir(`I:/BIM360-BackUp/${folder.projectName}`, () => {
      console.log("done", folder.projectName);
    });
  });
  // download all project items inside its folder
  let allitems = [];
  const folderItem = await items();
  const item = await itemsDetail();
  allitems.push(item, folderItem);
  const flatAllItems = flatten(allitems);
  // return flatAllItems;

  // return only K07 K08 K09
  const kItems = flatAllItems.filter((item) => {
    if (
      item.fileName.includes("K07") ||
      item.fileName.includes("K08") ||
      item.fileName.includes("K09") ||
      item.fileName.includes("K10")
    ) {
      return true;
    } else return false;
  });

  // Remove IFC from UN17_K09_F2_KON_VOID.ifc.RVT <Example>
  // const removeIFC = kItems.filter((item) => item.originalItemUrn);

  console.log(flatAllItems.length);

  let newArray = [];
  for (let i = 0; i < kItems.length; i++) {
    const items = kItems[i];
    try {
      const writeStream = fs.createWriteStream(
        `I:/BIM360-BackUp/${items.projectName}/${items.fileName}`
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
      const totalLength = response.data.headers["content-length"];
      // console.log(response.data.headers);

      console.log("Starting download");
      const progressBar = new ProgressBar(
        `-> downloading [:bar] :percent :etas`,
        {
          width: 40,
          complete: "=",
          incomplete: " ",
          renderThrottle: 2,
          total: parseInt(totalLength),
        }
      );

      await response.data.on("data", (chunk) => progressBar.tick(chunk.length));

      await response.data.pipe(writeStream);

      writeStream.on("error", function (err) {
        console.log(err);
      });

      writeStream.on("close", () => {
        console.log("Done.....", items.fileName);
        newArray.push(items.fileName);
        if (newArray.length == flatAllItems.length) {
          console.log(newArray.length);
          console.log("++++++++++++++++++ DONE");
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return "done";
}

module.exports = { downloadItem };
