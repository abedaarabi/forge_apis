const { projectDetails } = require("./projectDetails");
const { FetchFunction } = require("./fetchFunction");
const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");
const { Hub } = require("./Hub");

require("dotenv").config({ path: "./.env" });

async function topFolders() {
  const credentials = await oAuth2TwoLegged();
  const hubId = await Hub();
  const projectIds = await projectDetails();
  const projectFileURN = await Promise.all(
    projectIds
      .map(async (topFoldersDetaile) => {
        const folderDetaile = await FetchFunction(
          `${process.env.API_ENDPOINT}project/v1/hubs/${hubId}/projects/${topFoldersDetaile.projectId}/topFolders`,
          credentials.access_token
        );
        return { folderDetaile, topFoldersDetaile };
      })
      .map(async (topFolder) => {
        const folder = await topFolder;
        const projectDetails = await topFolder;

        const folders = folder.folderDetaile.data.filter((displayName) => {
          const foldersname = displayName.attributes.displayName;
          if (foldersname === "Project Files") {
            return true;
          } else {
            return false;
          }
        });

        return { folders, FoldersDetaile: projectDetails.topFoldersDetaile };
      })
      .map(async (urns) => {
        const folderUrn = await urns;

        const folderUrnId = await folderUrn.folders.map((folder) => {
          return {
            urnFolder: folder.id,
            projectId: folderUrn.FoldersDetaile.projectId,
            projectName: folderUrn.FoldersDetaile.projectName,
          };
        });
        return folderUrnId;
      })
  ).catch((error) => {
    console.log(error);
  });
  const flat = [].concat.apply([], projectFileURN);
  return flat;
}

//here where you can find .rvt outside the folder or from inside the folder.
async function folders() {
  try {
    const credentials = await oAuth2TwoLegged();
    const folderDetails = await topFolders();

    const folders = await Promise.all(
      folderDetails.map(async (folderDetail) => {
        const folderContents = await FetchFunction(
          `${process.env.API_ENDPOINT}data/v1/projects/${folderDetail.projectId}/folders/${folderDetail.urnFolder}/contents`,
          credentials.access_token
        );

        return { ...folderContents, folderDetail };
      })
    );
    return folders;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { folders, topFolders };
