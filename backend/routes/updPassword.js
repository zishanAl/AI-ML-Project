const express = require("express");
const updP = express.Router();
const bcrypt = require("bcryptjs");
const admin = require("../models/adminDetails");
const gs = require("../models/portalDetails");

// Password Changer for Coordinators
updP.post("/changep/:username", (req, res) => {
  var username = req.params.username;
  var password = req.body.password;
  var newPassword = req.body.npassword;
  var cnfPassword = req.body.cpassword;
  var query = { username: username };
  bcrypt.genSalt(10, (err, Salt) => {
    if (err) throw err;
    if (newPassword == cnfPassword) {
      bcrypt.hash(newPassword, Salt, (err, hash) => {
        var update = { password: hash };
        admin.find(query, (err, result) => {
          if (err) throw err;
          bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              admin.findOneAndUpdate(query, update, null, (err, result) => {
                if (err) throw err;
                console.log("Password Updated");
                res.redirect("/user/" + username);
              });
            } else res.send(401).json({ status: -1 });
          });
        });
      });
    } else res.send(401).json({ status: -1 });
  });
});

// Password Changer for GS
updP.post("/changepgs/:pst", (req, res) => {
  var post = req.params.pst;
  var password = req.body.password;
  var newPassword = req.body.npassword;
  var cnfPassword = req.body.cpassword;
  var query = { post: post };
  bcrypt.genSalt(10, (err, Salt) => {
    if (err) throw err;
    if (newPassword == cnfPassword) {
      bcrypt.hash(newPassword, Salt, (err, hash) => {
        var update = { password: hash };
        gs.find(query, (err, result) => {
          if (err) throw err;
          bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              gs.findOneAndUpdate(query, update, null, (err, result) => {
                if (err) throw err;
                console.log("Password Updated");
                res.redirect("/mngmt/" + post);
              });
            } else res.send(401).json({ status: -1 });
          });
        });
      });
    } else res.send(401).json({ status: -1 });
  });
});

module.exports = updP;
