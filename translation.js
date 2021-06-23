const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");
const axios = require("axios");
async function publishModel(projectId) {
  const credentials = await oAuth2TwoLegged();

  const urnId = "urn:adsk.wipprod:dm.lineage:mF7-c5plRv6MunMkeSOt-Q";

  const url = `https://developer.api.autodesk.com/data/v1/projects/b.79a6bff3-34b1-435f-8964-282f78ae1ef5/commands`;
  return axios({
    method: "post",
    url,
    headers: {
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlU3c0dGRldUTzlBekNhSzBqZURRM2dQZXBURVdWN2VhIn0.eyJzY29wZSI6WyJkYXRhOmNyZWF0ZSIsImRhdGE6d3JpdGUiLCJkYXRhOnJlYWQiLCJhY2NvdW50OnJlYWQiXSwiY2xpZW50X2lkIjoiN0tRNHZxYjd1SkZXZ1dZZ05SbmhFNlQ1WkRuYnhQY24iLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvYWp3dGV4cDYwIiwianRpIjoiS2twaktPZWpxZ1RuUnBPQlZYMTNJbGMxRTR4SzVnZkIyeVNCeEtDbWlZRElPZk5CMEVCYUxzbUlxcUdxWEZldSIsInVzZXJpZCI6IkczN0hSSDIyRFdCViIsImV4cCI6MTYyNDQ3OTE4OX0.K1cH8zkXPNxriN_BqIA1Fy8iaENPMK3fjPTGiROqgjtd5A4tOFsPXiKx5sIXJ9DgImHHV8uqnV1rZgEWv2eDUTjlaKglRHVvkabTnRBHZ7JjNcz7FxmcigSpcxMJeHTyXhjSkauhNCCvfLYM2rUIgoomFhXbth0fcEAxKUEdWj8vU8AhG2yaE4al0yrCJSm8kRmqIDf74wNDAaBZTbUX-7DAZPMj1DU0h2rIuZ9ZwSUd_a3ubdmxwBKDUSFZr-V2YFed1VyGKGHqPSR1wppl4L5Pvxab2bRYe_aXrQrHgxv1_0q4NDSxN4aPzW8ZbNMnNHWNJdWL56LjM5QafRakJA`,
      "Content-Type": "application/vnd.api+json",
    },
    data: JSON.stringify({
      jsonapi: {
        version: "1.0",
      },
      data: {
        type: "commands",
        attributes: {
          extension: {
            type: "commands:autodesk.bim360:C4RModelPublish",
            version: "1.0.0",
          },
        },
        relationships: {
          resources: {
            data: [
              {
                type: "items",
                id: urnId,
              },
            ],
          },
        },
      },
    }),
  });
}

module.exports = { publishModel };
