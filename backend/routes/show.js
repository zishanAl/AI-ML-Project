const express = require("express");
const Webverse = require("../models/webverse");
const aiml = require("../models/aiml");
const android = require("../models/android");
const robotics = require("../models/robotics");
const blockchain = require("../models/blockchain");
const electronics = require("../models/electronics");
const cyber = require("../models/cyber");
const news = require("../models/news");
const show = express.Router();
var admin = require("../models/adminDetails");
// Fetch coordinators detail  and send to admin-portal 
show.get("/user/:username", (req, res) => {
  var username = req.params.username;
  var query = { name: username };
  admin.find(query, (err, result) => {
    if (err) {
      return res.status(401).json({ status: -1 });
    }
    if (result.length == 0) {
      return res.status(401).json({ status: -1 });
    }
    username = result[0].name;
    let club = result[0].club;
    //  also fetch the resources from particular club and send to admin-portal
    if (club === "WebVerse") {
      Webverse.find({}, (err, resources) => {
        if (err) throw err;
        news.find({ by: result[0].fname }, (err, news) => {
          if (req.user) {
            res.render("admin-portal.ejs", {
              username: result[0].name,
              email: result[0].email,
              fname: result[0].fname,
              lname: result[0].lname,
              club: result[0].club,
              linkedin: result[0].linkedIn,
              instagram: result[0].instagram,
              github: result[0].github,
              image: result[0].image,
              resources: resources,
              news: news,
            });
          } else res.redirect("/admin");
        });
      });
    } else if (club === "Robosapiens") {
      robotics.find({}, (err, resources) => {
        if (err) throw err;
        news.find({ by: result[0].fname }, (err, news) => {
          if (req.user) {
            res.render("admin-portal.ejs", {
              username: result[0].name,
              email: result[0].email,
              fname: result[0].fname,
              lname: result[0].lname,
              club: result[0].club,
              linkedin: result[0].linkedIn,
              instagram: result[0].instagram,
              github: result[0].github,
              image: result[0].image,
              resources: resources,
              news: news,
            });
          } else res.redirect("/admin");
        });
      });
    } else if (club === "AIML") {
      aiml.find({}, (err, resources) => {
        if (err) throw err;
        news.find({ by: result[0].fname }, (err, news) => {
          if (req.user) {
            res.render("admin-portal.ejs", {
              username: result[0].name,
              email: result[0].email,
              fname: result[0].fname,
              lname: result[0].lname,
              club: result[0].club,
              linkedin: result[0].linkedIn,
              instagram: result[0].instagram,
              github: result[0].github,
              image: result[0].image,
              resources: resources,
              news: news,
            });
          } else res.redirect("/admin");
        });
      });
    } else if (club === "Electronics") {
      electronics.find({}, (err, resources) => {
        if (err) throw err;
        news.find({ by: result[0].fname }, (err, news) => {
          if (req.user) {
            res.render("admin-portal.ejs", {
              username: result[0].name,
              email: result[0].email,
              fname: result[0].fname,
              lname: result[0].lname,
              club: result[0].club,
              linkedin: result[0].linkedIn,
              instagram: result[0].instagram,
              github: result[0].github,
              image: result[0].image,
              resources: resources,
              news: news,
            });
          } else res.redirect("/admin");
        });
      });
    } else if (club === "Cyber") {
      cyber.find({}, (err, resources) => {
        if (err) throw err;
        news.find({ by: result[0].fname }, (err, news) => {
          if (req.user) {
            res.render("admin-portal.ejs", {
              username: result[0].name,
              email: result[0].email,
              fname: result[0].fname,
              lname: result[0].lname,
              club: result[0].club,
              linkedin: result[0].linkedIn,
              instagram: result[0].instagram,
              github: result[0].github,
              image: result[0].image,
              resources: resources,
              news: news,
            });
          } else res.redirect("/admin");
        });
      });
    } else if (club === "Android") {
      android.find({}, (err, resources) => {
        if (err) throw err;
        news.find({ by: result[0].fname }, (err, news) => {
          if (req.user) {
            res.render("admin-portal.ejs", {
              username: result[0].name,
              email: result[0].email,
              fname: result[0].fname,
              lname: result[0].lname,
              club: result[0].club,
              linkedin: result[0].linkedIn,
              instagram: result[0].instagram,
              github: result[0].github,
              image: result[0].image,
              resources: resources,
              news: news,
            });
          } else res.redirect("/admin");
        });
      });
    } else if (club === "Blockchain") {
      blockchain.find({}, (err, resources) => {
        if (err) throw err;
        news.find({ by: result[0].fname }, (err, news) => {
          if (req.user) {
            res.render("admin-portal.ejs", {
              username: result[0].name,
              email: result[0].email,
              fname: result[0].fname,
              lname: result[0].lname,
              club: result[0].club,
              linkedin: result[0].linkedIn,
              instagram: result[0].instagram,
              github: result[0].github,
              image: result[0].image,
              resources: resources,
              news: news,
            });
          } else res.redirect("/admin");
        });
      });
    }
  });
});

module.exports = show;
