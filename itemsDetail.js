const { getFolderItemHelper } = require("./helper");
const { folders } = require("./topFolders");

async function itemsDetail() {
  const items = await folders();
  const itemsDetails = getFolderItemHelper(items);
  return itemsDetails;
}

module.exports = { itemsDetail };
