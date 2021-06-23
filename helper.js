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
function getItemVersionHelper(folder, folderItems) {
  const includeds = folder
    .filter((item) => {
      if (item.included) {
        return true;
      } else {
        return false;
      }
    })
    .map((attribute) => {
      const item = attribute.data.filter((item) => item.type === "items");

      return {
        item,
        included: attribute.included,
        folderDetail: attribute.folderDetail,
      };
    });

  const Items = includeds.map((itemInfo) => {
    return itemInfo.item.map((item) => {
      return {
        itemId: item.id,
        itemType: item.type,
        displayName: item.attributes.displayName,
        createTime: item.attributes.createTime,
        createUserName: item.attributes.createUserName,
        lastModifiedTime: item.attributes.lastModifiedTime,
        lastModifiedUserName: item.attributes.lastModifiedUserName,
        ...itemInfo.folderDetail,
      };
    });
  });
  // const flatenItem = flatten(Items);
  const itemVersions = folder
    .map((itemVersion) => {
      return { itemVersion, folderDetail: itemVersion.folderDetail };
    })
    .filter((item) => item.itemVersion.included);

  const includes = itemVersions.map((item) => {
    const allIncludes = item.itemVersion.included.filter((item) => {
      if (
        item.attributes.fileType === "rvt" &&
        item.relationships.derivatives.data.type === "derivatives"
      ) {
        {
          return true;
        }
      } else {
        false;
      }
    });
    return { allIncludes, folderDetail: item.folderDetail };
  });

  const allInclouded = includes.map((itemIncloude) => {
    const itemVersion = itemIncloude.allIncludes.map((incloude) => {
      return {
        itemVersion: incloude.id,
        type: incloude.type,
        derivativesId: incloude.relationships.derivatives.data.id,
        createUserName: incloude.attributes.createUserName,
        fileType: incloude.attributes.fileType,
        createTime: incloude.attributes.createTime,
        lastModifiedTime: incloude.attributes.lastModifiedTime,
        lastModifiedUserName: incloude.attributes.lastModifiedUserName,
        storageSize: incloude.attributes.storageSize,
        fileName: incloude.attributes.displayName,
        extension: incloude.attributes.extension.type,
        ...itemIncloude.folderDetail,
      };
    });
    return itemVersion;
  });
  const flatenallInclouded = flatten(allInclouded);
  const flatenallItems = flatten(Items);
  return { flatenallInclouded, flatenallItems };
}

/**
 * 

 */
// Get all foders details in order to fetch the items
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

  const itemsInformations = contentType("items", foldersAttributes);

  const itemDetaile = itemsInformations.map((item) => {
    return {
      type: item.folderInfo.type,
      itemId: item.folderInfo.id,
      displayName: item.folderInfo.attributes.displayName,
      createTime: item.folderInfo.attributes.createTime,
      createUserName: item.folderInfo.attributes.createUserName,
      lastModifiedTime: item.folderInfo.attributes.lastModifiedTime,
      lastModifiedUserName: item.folderInfo.attributes.lastModifiedUserName,
      hidden: item.folderInfo.attributes.hidden,
      C4RModelType: item.folderInfo.attributes.extension.type,

      ...item.folderDetail,
    };
  });

  // return itemDetaile;
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

module.exports = {
  flatten,
  getItemVersionHelper,
  folderInfoHelper,
  contentType,
};
