const express = require("express");
const bcrypt = require("bcryptjs");
var admin = require("../models/adminDetails");
const { append } = require("express/lib/response");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
const login = express.Router();

const generateAuthToken=require("../middleware/authToken"); //Creation of Tokens so that it will be sent ot Cookies


var authTokens = {};

login.post("/login", (req, res) => {
  var userName = req.body.username;
  var password = req.body.password;
  bcrypt.genSalt(10, (err, Salt) => {
    if (err) throw err;
    var query = { name: userName };

    // Password Checking
    admin.find(query, (err, result) => {
      if (err) throw err;
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (!isMatch) {
          res.render("admin.ejs", {
            passowrdCheck: "Wrong Username or Password!!",
          });
        } else {
          // Cookie Settings
          const authToken = generateAuthToken();
          authTokens[authToken] = true;
          console.log("Valid Credentials");
          res.cookie("AuthToken", authToken);
          res.redirect("/user/" + userName);
        }
      });
    });
  });
});

login.use((req, res, next) => {
  // Passing that User Authenticated and we can proceed to Admin Page
  var authToken = req.cookies.AuthToken;
  req.tokens=authTokens;
  req.user = authTokens[authToken];
  next();
});

// If User logouts then Cookie Data changes and now without login user can not able to access the codes
login.get("/logout/:username", (req, res) => {
  var username=req.params.username;
  var authToken = req.cookies.AuthToken;
  req.tokens[authToken] = false;
  res.redirect("/user/"+username);
});

module.exports = login;
