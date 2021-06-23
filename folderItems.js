const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");
const { FetchFunction } = require("./fetchFunction");
const { folderDetails } = require("./folderDetails");
const { getFolderItemHelper } = require("./helper");

require("dotenv").config({ path: "./.env" });

// Get all the items that located inside the folder
async function items() {
  let array = [];
  const folders = await folderDetails();
  const credentials = await oAuth2TwoLegged();
  for (let i = 0; i < folders.length; i++) {
    const iItem = folders[i];
    // console.log("start the loop", folders[i].projectName);
    const itemContent = await FetchFunction(
      `${process.env.API_ENDPOINT}data/v1/projects/${iItem.projectId}/folders/${iItem.folderId}/contents`,

      credentials.access_token
    );
    const folderDetail = {
      urnFolder: iItem.urnFolder,
      projectId: iItem.projectId,
      projectName: iItem.projectName,
    };
    array.push({ ...itemContent, folderDetail });
  }
  const itemsDetails = getFolderItemHelper(array);
  return itemsDetails;
}

module.exports = { items };
