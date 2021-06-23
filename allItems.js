const { items } = require("./folderItems");
const { flatten } = require("./helper");
const { folderDetails } = require("./folderDetails");

async function allItems(params) {
  let allBIM360Items = [];
  const item = await items();
  const folders = await folderDetails();
  allBIM360Items.push(folders.itemDetaile, item.flatenallItems);
  const flattenItems = flatten(allBIM360Items);

  return flattenItems;
}

module.exports = { allItems };
