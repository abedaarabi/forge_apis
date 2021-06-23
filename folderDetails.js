const { folders } = require("./topFolders");
const { folderInfoHelper } = require("./helper");

// const { publishModel } = require("./translation");

async function folderDetails() {
  const projectFolder = await folders();
  // const translate = await publishModel();
  const details = folderInfoHelper(projectFolder);

  return details;
}

module.exports = { folderDetails };
