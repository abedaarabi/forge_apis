function flatten(arr) {
  let flatArray = [];

  arr.forEach((element) => {
    if (Array.isArray(element)) {
      flatArray = flatArray.concat(flatten(element));
    } else {
      flatArray.push(element);
    }
  });

  return flatArray;
}

//Get Item from any folder.
function getItemVersionHelper(folder, folderItems) {
  const test = folder.filter((item) => item.included);

  const revitFilesIncluded = test
    .map((item) => {
      const allIncluded = item.included.filter((item) => {
        if (item.attributes.fileType === "rvt") {
          return true;
        } else {
          return false;
        }
      });

      return { allIncluded, folderDetail: item.folderDetail };
    })
    .filter((item) => item.allIncluded.length != 0);

  const itemAndVersionIfo = revitFilesIncluded.map((allItems) => {
    const allIncludes = allItems.allIncluded.map((incloude) => {
      const downloadItems =
        incloude.relationships.storage.meta.link.href.split("?")[0];

      return {
        versionId: incloude.id,
        versionType: incloude.type,
        derivativesId: incloude.relationships.derivatives.data.id,
        createUserName: incloude.attributes.createUserName,
        fileType: incloude.attributes.fileType,
        createTime: incloude.attributes.createTime,
        lastModifiedTime: incloude.attributes.lastModifiedTime,
        lastModifiedUserName: incloude.attributes.lastModifiedUserName,
        storageSize: incloude.attributes.storageSize,
        fileName: incloude.attributes.displayName,
        extension: incloude.attributes.extension.type,
        originalItemUrn: incloude.attributes.extension.data.originalItemUrn,
        projectGuid: incloude.attributes.extension.data.projectGuid,
        downloadItem: downloadItems,
        ...allItems.folderDetail,
      };
    });
    return allIncludes;
  });

  const flatItemAndVersionIfo = flatten(itemAndVersionIfo);
  return flatItemAndVersionIfo;
}

// Get all folders details in order to fetch its items
function folderInfoHelper(folder, folderItems) {
  const foldersAttributes = folder
    .filter((item) => item.data)
    .map((folder) => {
      return folder.data.map((folderInfo) => {
        return { folderInfo, folderDetail: folder.folderDetail };
      });
    });

  const folderInformations = contentType("folders", foldersAttributes);

  const foldersDetaile = folderInformations.map((folder) => {
    return {
      folderId: folder.folderInfo.id,
      type: folder.folderInfo.type,
      name: folder.folderInfo.attributes.displayName,
      createUserName: folder.folderInfo.attributes.createUserName,
      lastModifiedUserName: folder.folderInfo.attributes.lastModifiedUserName,
      createTime: folder.folderInfo.attributes.createTime,
      lastModifiedTime: folder.folderInfo.attributes.lastModifiedTime,
      hidden: folder.folderInfo.attributes.hidden,
      ...folder.folderDetail,
    };
  });
  // Get item from inside Folder Files
  const itemDetaile = getItemVersionHelper(folder);

  return { foldersDetaile, itemDetaile };
}

function contentType(type, attributes) {
  const flattenFolder = flatten(attributes);
  const folderInformationss = flattenFolder.filter((folder) => {
    if (folder.folderInfo.type === type) {
      return true;
    } else {
      return false;
    }
  });

  return folderInformationss;
}

async function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

module.exports = {
  flatten,
  getItemVersionHelper,
  folderInfoHelper,
  contentType,
  delay,
};
