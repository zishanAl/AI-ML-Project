const express = require("express");
const clubs = express.Router();

var admin = require("../models/adminDetails");
var news = require("../models/news");
// Home page url 
clubs.get("/", (req, res) => {
  news.find({}, (err, result) => {
    if (err) throw err;
    res.render("index.ejs", { news: result });
  });
});

// Clubs Url
clubs.get("/:site", (req, res) => {
  var site = req.params.site;
  // particular club site with coordinator detail
  if (site == "coding") res.render("coding.ejs");
  else if (site == "web") {
    var query = { club: "WebVerse" };
    admin.find(query, (err, result) => {
      if (err) throw err;
      // console.log(result);
      res.render("web.ejs", { results: result });
    });
  } else if (site == "ai") {
    var query = { club: "AI/ML" };
    admin.find(query, (err, result) => {
      if (err) throw err;
      res.render("ai.ejs", { results: result });
    });
  } else if (site == "android") {
    var query = { club: "Android" };
    admin.find(query, (err, result) => {
      if (err) throw err;
      res.render("android.ejs", { results: result });
    });
  } else if (site == "robotics") {
    var query = { club: "Robosapiens" };
    admin.find(query, (err, result) => {
      if (err) throw err;
      res.render("robotics.ejs", { results: result });
    });
  } else if (site == "blockchain") {
    var query = { club: "Blockchain" };
    admin.find(query, (err, result) => {
      if (err) throw err;
      res.render("blockchain.ejs", { results: result });
    });
  } else if (site == "cyber") {
    var query = { club: "Cyber Security" };
    admin.find(query, (err, result) => {
      if (err) throw err;
      res.render("cyber.ejs", { results: result });
    });
  } else if (site == "electronics") {
    var query = { club: "Electronics" };
    admin.find(query, (err, result) => {
      if (err) throw err;
      res.render("electronics.ejs", { results: result });
    });
  } else if (site == "admin") {
    res.render("admin.ejs", { passowrdCheck: "" });
  } else if (site == "admin-portal") res.render("admin-portal.ejs");
  else if(site == 'ecell'){
    res.render('ecell.ejs');
  }
  else if (site == "gs") {
    res.render("gs-tech.ejs", { passwordCheck: "" });
  }
});

module.exports = clubs;
