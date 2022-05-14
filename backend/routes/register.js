const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const register = express.Router();
const path = require("path");
const admin = require("../models/adminDetails");
const gs = require("../models/portalDetails");
const upload = require("../middleware/imgUpd");

// Maintaining the registration of the Cordinators 
register.post("/register/:pst", upload.single("image"), (req, res) => {
  var userName = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var fName = req.body.fname;
  var lName = req.body.lname;
  var clubName = req.body.club;
  var post=req.params.pst;

  bcrypt.genSalt(10, (err, Salt) => {
    if (err) throw err;
    // Create a new object in model admin_detail and generating a hash password
    bcrypt.hash(password, Salt, (err, hash) => {
      if (err) throw err;
      var new_admin = new admin({
        name: userName,
        email: email,
        password: hash,
        fname: fName,
        lname: lName,
        club: clubName,
        image: {
          data: fs.readFileSync(
            path.join(__dirname + "/uploads/" + req.file.filename)
          ),
          contentType: "image/png",
        }
      });
      // save coordinator to the data base
      new_admin.save((err, res) => {
        if (err) throw err;
        console.log("User Data Added");
        fs.unlinkSync(path.join(__dirname + "/uploads/" + req.file.filename));
      });
    });
  });
  res.redirect("/mngmt/"+post);
});

// Delete the Cordinators from data base

register.post('/deleteCordinator/:post', async (req, res) => {
  post = req.params.post;
  try {
    // find the gs detail using post 
    var user = await gs.findOne({ post: post });
    // console.log(user.username);

    // gs with the post not exit than return 
    if (!user) {
      res.redirect('/mngmt/tech');
    }

    // console.log(req.body);
    // compare the gs password if match than move forward else redirect
    var match = await bcrypt.compare(req.body.password, user.password);
    // console.log(match);
    if (!match) {
      return res.redirect('/mngmt/tech');
    }

    // after all authentication remove the coordintor from the data base
    await admin.findOneAndRemove({ _id:req.body.id});
    // console.log(req.body.id);
    res.redirect('/mngmt/tech');
  } catch (error) {
    // console.log('error'+error);
    res.redirect('/mngmt/tech');
  }
})

module.exports = register;
