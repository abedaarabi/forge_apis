const fetch = require("node-fetch");

const { oAuth2TwoLegged } = require("./oAuth2TwoLegged");

// const fs = require("fs");
// const result = fs.readFileSync(__dirname + "/token.txt");
// const TOKEN = JSON.parse(result.toString()).access_token;

async function FetchFunction(url = "", credentials) {
  const TOKEN = await oAuth2TwoLegged();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

module.exports = { FetchFunction };


;