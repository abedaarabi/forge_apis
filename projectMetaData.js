const { fetchProjectMetaData } = require("./fetchProjectMetaData");

async function revitData() {
  const dataProperties = await fetchProjectMetaData();

  const dataHasTypeName = dataProperties.map((element) => {
    const eltCollection = element.metaData.data.collection.filter((elt) => {
      if (
        elt.properties["Identity Data"] &&
        elt.properties["Identity Data"]["Type Name"]
      ) {
        return true;
      } else {
        return false;
      }
    });
    return { eltCollection, itemDteails: element.itemDteails };
  });

  const properties = dataHasTypeName.map((property) => {
    const element = property.eltCollection.map((elt) => {
      const dbId = elt.name.split("[")[1].split("]")[0];
      return {
        name: elt.name,
        dbId: Number(dbId),
        externalId: elt["externalId"],
        typName: elt.properties["Identity Data"]["Type Name"],

        versionId: property.itemDteails.versionId,
      };
    });
    const versionId = property.itemDteails.versionId;
    const projectId = property.itemDteails.projectId;
    const projectName = property.itemDteails.projectName;
    const originalItemUrn = property.itemDteails.originalItemUrn;
    const fileName = property.itemDteails.fileName;
    return {
      projects: { projectName, projectId },
      items: { fileName, originalItemUrn, versionId, projectId },
      element,
    };
  });

  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(properties);

  return properties;
}
module.exports = { revitData };
