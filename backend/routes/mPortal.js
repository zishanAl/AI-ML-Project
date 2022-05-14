const express = require("express");
const mportal = express.Router();

var gs = require("../models/portalDetails");
var admin = require("../models/adminDetails");

// rendering of the GS Management Portal if encryption authentuication gets succedded and passing the Datas to the Page
mportal.get("/mngmt/:pst", (req, res) => {
  var post = req.params.pst;
  var query = { post: post };
  gs.find(query, (err, result) => {
    if (err) throw err;
    r1 = result[0];
    if (req.gs) {
      res.render("gs-portal.ejs", {
        fname: result[0].fname,
        lname: result[0].lname,
        post: result[0].post,
        email: result[0].email,
        img: result[0].img,
        result: [],
      });
    } else res.redirect("/gs");
  });
});

// To show the coordinator data at Gs portal

mportal.post("/findDetails/:pst", (req, res) => {
  var club = req.body.club;
  var post = req.params.pst;
  admin.find({ club: club }, (err, result) => {
    if (err) throw err;
    gs.find({ post: post }, (err, r1) => {
      if (err) throw err;
      if (req.gs) {
        res.render("gs-portal.ejs", {
          result: result,
          fname: r1[0].fname,
          lname: r1[0].lname,
          post: r1[0].post,
          email: r1[0].email,
          img: r1[0].img,
        });
      } else res.redirect("/gs");
    });
  });
});

module.exports = mportal;
