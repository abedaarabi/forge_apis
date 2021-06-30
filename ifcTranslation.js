const { oAuth2TwoLegged, auth } = require("./oAuth2TwoLegged");

async function publishModelIFC(projectId) {
  const test = await auth();
  const credentials = await oAuth2TwoLegged();
  console.log(`${credentials.access_token}`);
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++");

  const url = `https://developer.api.autodesk.com/modelderivative/v2/designdata/job`;
  const trs = await axios({
    url,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${test.data.access_token}`,
    },

    body: {
      input: {
        urn: "dXJuOmFkc2sud2lwcHJvZDpmcy5maWxlOnZmLm1GNy1jNXBsUnY2TXVuTWtlU090LVE_dmVyc2lvbj0xMA",
      },
      output: {
        destination: {
          region: "us",
        },
        formats: [
          {
            type: "ifc",
          },
        ],
      },
    },
  });
  console.log(trs.data);
  return trs;
}

module.exports = { publishModelIFC };
