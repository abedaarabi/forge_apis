const express = require("express");
const app = express();
const cron = require("node-cron");

const { items } = require("./folderItems");
const { translationProgress } = require("./translationProgress");
const { downloadItem } = require("./downlodItem");

const { revitData } = require("./projectMetaData");

const { metadata } = require("./tester");
const { derivativeGuid } = require("./derivative");
const { publishModel } = require("./translation");

//******************************************** */
const { folderDetails } = require("./folderDetails");
const { itemsDetail } = require("./itemsDetail");

app.get("/items", async function (req, res) {
  const items = await itemsDetail();
  res.send(items);
});

app.get("/folderItems", async function (req, res) {
  const item = await items();

  res.send(item);
});
app.get("/folders", async function (req, res) {
  const folders = await folderDetails();
  res.send(folders.foldersDetaile);
});

//**************derivative******* */
app.get("/derivativeGuid", async function (req, res) {
  const guid = await derivativeGuid();
  res.send(guid);
});
app.get("/revitData", async function (req, res) {
  // const guid = await translationProgress();
  const guid = await revitData();
  res.send(guid);
});
app.get("/publishModel", async function (req, res) {
  // const guid = await translationProgress();
  const guid = await publishModel();
  res.send(guid);
});
app.get("/downloadItem", async function (req, res) {
  // const guid = await translationProgress();
  const item = await downloadItem();
  res.send(item);
});

// var task = cron
//   .schedule(
//     "1 * * * * *",
//     async () => {
//       console.log("Printing this line every minute in the terminal");
//       await revitData();
//     },
//     {
//       scheduled: true,
//     }
//   )
//   .start();

const stratServer = async () => {
  app.listen(3002, console.log(`server is running on ${3002} ` || 8080));
};

(async () => {
  await stratServer();
  console.log("**** Script Start ****");
  // await revitData();
  console.log("**** Script End :) ****");
})();
