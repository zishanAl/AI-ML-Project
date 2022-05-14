const express = require("express");
const gsAdmin = express.Router();
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
var upload = require("../middleware/imgUpd");
var gs = require("../models/portalDetails");
const generateAuthToken=require("../middleware/authToken");

var authTokensGS={}

var un = "gs.technical@iiitbh.ac.in";
// authentication of gs 
gsAdmin.post(
  "/gsLogin",
  // upload.single("image"),
  (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if (username != un)
      res.render("gs-tech.ejs", { passwordCheck: "Incorrect Username!!" });
    bcrypt.genSalt(10, (err, Salt) => {
      if (err) throw err;
      // bcrypt.hash(ps, Salt, (err, hash) => {
      //   if (err) throw err;
      //   var new_gs = new gs({
      //     username: un,
      //     password: hash,
      //     fname: "Nitish",
      //     lname: "Kumar",
      //     post: "tech",
      //     email: un,
      //     img: {
      //       data: fs.readFileSync(
      //         path.join(__dirname + "/uploads/" + req.file.filename)
      //       ),
      //       contentType: "image/png",
      //     },
      //   });
      //   new_gs.save((err, res) => {
      //     if (err) throw err;
      //     fs.unlinkSync(path.join(__dirname + "/uploads/" + req.filename));
      //   });
      var query = { username: username };
      // gs authentication
      gs.find(query, (err, result) => {
        if (err) throw err;
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
          if (isMatch) {
            const authTokenGS=generateAuthToken();
            authTokensGS[authTokenGS]=true;
            res.cookie('AuthTokenGS',authTokenGS);
            res.redirect("/mngmt/" + result[0].post);
          }
          else{
            res.render("gs-tech.ejs", { passwordCheck: "Wrong Password!!" });
          }
        });
      });
    });
  }
);

gsAdmin.use((req,res,next)=>{
  const authTokenGS=req.cookies.AuthTokenGS;
  req.tokensGS=authTokensGS;
  req.gs=authTokensGS[authTokenGS];
  next();
})

// logout from gs portal
gsAdmin.get('/gslogout/:post',(req,res)=>{
  var post=req.params.post;
  const authTokenGS=req.cookies.AuthTokenGS;
  req.tokensGS[authTokenGS]=false;
  res.redirect("/mngmt/"+post);
})

module.exports = gsAdmin;
