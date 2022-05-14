const express = require("express");
const update = express.Router();
var admin = require("../models/adminDetails");

// Updating the Details of the Coordinators link Social Links
update.post("/dataUpdate/:username", (req, res) => {
  var LinkedInLink = req.body.linkedin;
  var InstaLink = req.body.instagram;
  var GithubLink = req.body.github;
  var userName = req.params.username;
  var query = { name: userName };
  var newValues = {
    linkedIn: LinkedInLink,
    instagram: InstaLink,
    github: GithubLink,
  };
  admin.findOneAndUpdate(query, newValues, null, (err, result) => {
    if (err) throw err;
    console.log("Updated");
  });
  res.redirect("/user/" + userName);
});

module.exports = update;
