const { folders } = require("./topFolders");
const { folderInfoHelper } = require("./helper");

async function folderDetails() {
  const projectFolder = await folders();
  const details = folderInfoHelper(projectFolder);

  return details;
}

module.exports = { folderDetails };
