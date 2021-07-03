const { oAuth2TwoLegged, auth } = require("./oAuth2TwoLegged");
const fetch = require("node-fetch");
const { FetchFunction } = require("./fetchFunction");
const axios = require("axios");
const querystring = require("querystring");
var fs = require("fs");
const result = fs.readFileSync(__dirname + "/token.txt");
const TOKEN = JSON.parse(result.toString()).access_token;
async function downloadItem() {
  var writeStream = fs.createWriteStream("./downloads/abrd.ifc");

  const credentials = await auth();
  const url =
    "https://developer.api.autodesk.com/modelderivative/v2/designdata/dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk0wbDJyV3BmUW1HUTZQdGYweVRQeFE_dmVyc2lvbj0z/manifest/urn:adsk.viewing:fs.file:dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLk0wbDJyV3BmUW1HUTZQdGYweVRQeFE_dmVyc2lvbj0z/output/Resource/IFC/LLYN_B310_K09_F02_N01_detached.ifc";
  const response = await axios({
    url,
    responseType: "stream",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  response.data.pipe(writeStream);
  writeStream.on("error", function (err) {
    console.log(err);
  });
  // console.log(response.data);
  // return JSON.stringify("response.data");
}

module.exports = { downloadItem };
