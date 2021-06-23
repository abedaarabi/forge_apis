const express = require("express");
const app = express();

const { items } = require("./folderItems");
const { allItems } = require("./allItems");

const { guid } = require("./tester");

const { metadata } = require("./tester");
const { derivativeGuid } = require("./derivative");

//******************************************** */
const { folderDetails } = require("./folderDetails");
const { itemsDetail } = require("./itemsDetail");

app.get("/allItems", async function (req, res) {
  const items = await allItems();
  res.send(items);
});
app.get("/folderItems", async function (req, res) {
  const item = await items();

  res.send(item);
});
app.get("/folders", async function (req, res) {
  const folders = await folderDetails();
  res.send(folders);
});

//**************derivative******* */
app.get("/derivativeGuid", async function (req, res) {
  const guid = await derivativeGuid();
  res.send(guid);
});

const stratServer = async () => {
  app.listen(3002, console.log(`server is running on ${3002} ` || 8080));
};

stratServer();
