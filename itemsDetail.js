const { getItemVersionHelper } = require("./helper");
const { folders } = require("./topFolders");

async function itemsDetail() {
  const items = await folders();

  const itemsDetails = getItemVersionHelper(items);
  return itemsDetails;
}



module.exports = { itemsDetail };
