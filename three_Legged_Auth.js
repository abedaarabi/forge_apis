const axios = require("axios");
const querystring = require("querystring");
const fs = require("fs");
const { json } = require("express");
require("dotenv").config({ path: "./.env" });

function storeToken(data) {
  fs.writeFileSync(__dirname + "/token.txt", JSON.stringify(data));
}

async function refreshToken(token) {
  const url = `https://developer.api.autodesk.com/authentication/v1/refreshtoken`;
  try {
    const response = await axios({
      method: "post",
      url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: querystring.stringify({
        client_id: `${process.env.CLIENT_ID}`,
        client_secret: `${process.env.CLIENT_SECRET}`,
        grant_type: `refresh_token`,

        refresh_token: token,
      }),
    });

    storeToken(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getStoredToken() {
  let result = fs.readFileSync(__dirname + "/token.txt");

  const res = await JSON.parse(result.toString());

  return await refreshToken(res.refresh_token);
}

module.exports = { getStoredToken };
