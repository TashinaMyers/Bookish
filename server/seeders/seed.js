const db = require("../config/connection");
const { Profile } = require("../models");
const profileSeeds = require("./profileSeeds.json"); // So to have a blank db, need a blank array?? Do I need a blank JSON file?
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Profile", "profiles");

    await Profile.create(profileSeeds);

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
