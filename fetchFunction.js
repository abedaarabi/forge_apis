const fetch = require("node-fetch");

async function FetchFunction(url = "", credentials) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${credentials}`,
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
