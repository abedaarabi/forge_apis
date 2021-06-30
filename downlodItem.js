const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");
const fetch = require("node-fetch");

const download = require("downloadjs");
async function downloadItem() {
  const credentials = await oAuth2TwoLegged();
  const response = await fetch(
    `https://developer.api.autodesk.com/oss/v2/buckets/wip.dm.prod/objects/652d3566-07de-43e2-b28a-3eaf375a9a53.rvt`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${credentials.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return await response.blob().then((item) => console.log(item));
}

module.exports = { downloadItem };
