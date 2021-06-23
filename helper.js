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

//Item filter and extract the needed data
function getFolderItemHelper(folder, folderItems) {
  const includeds = folder
    .filter((item) => item.included)
    .map((attribute) => {
      return attribute.included.map((derivative) => {
        return { derivative, folderDetail: attribute.folderDetail };
      });
    });
  const flatenItem = flatten(includeds);
  const checkItemDetails = flatenItem.filter((item) => {
    if (item.derivative.attributes.fileType === "rvt") {
      if (
        item.derivative.relationships.derivatives.data.type === "derivatives"
      ) {
        return true;
      }
    } else {
      false;
    }
  });
  const itemDetails = checkItemDetails.map((itemDetail) => {
    return {
      itemId: itemDetail.derivative.id,
      type: itemDetail.derivative.type,
      derivativesId: itemDetail.derivative.relationships.derivatives.data.id,
      createUserName: itemDetail.derivative.attributes.createUserName,
      fileType: itemDetail.derivative.attributes.fileType,
      createTime: itemDetail.derivative.attributes.createTime,
      lastModifiedTime: itemDetail.derivative.attributes.lastModifiedTime,
      lastModifiedUserName:
        itemDetail.derivative.attributes.lastModifiedUserName,
      storageSize: itemDetail.derivative.attributes.storageSize,
      fileName: itemDetail.derivative.attributes.displayName,
      ...itemDetail.folderDetail,
    };
  });

  return itemDetails;
}
// Get all foders details in order to fetch the items
function folderInfoHelper(folder, folderItems) {
  const foldersAttributes = folder
    .filter((item) => item.data)
    .map((folder) => {
      return folder.data.map((folderInfo) => {
        return { folderInfo, folderDetail: folder.folderDetail };
      });
    });
  const flattenFolder = flatten(foldersAttributes);
  const folderInformationss = flattenFolder.filter((folder) => {
    if (folder.folderInfo.type === "folders") {
      return true;
    } else {
      return false;
    }
  });
  const foldersIds = folderInformationss.map((folder) => {
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

  return foldersIds;
}

module.exports = { flatten, getFolderItemHelper, folderInfoHelper };
