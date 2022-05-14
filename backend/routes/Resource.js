const express = require("express");
const adminDetails = require("../models/adminDetails");
const bcrypt = require("bcryptjs");
const Webverse = require("../models/webverse");
const aiml = require("../models/aiml");
const android = require("../models/android");
const robotics = require("../models/robotics");
const blockchain = require("../models/blockchain");
const electronics = require("../models/electronics");
const cyber = require("../models/cyber");
const router = express.Router();

// Resource addition by the Club Coordinators
router.post("/Data/:club", async (req, res) => {
  let club = req.params.club;
  // console.log(req.body);
  // console.log(club);
  try {
    let userName = req.body.username;
    let password = req.body.password;
    // console.log(req.body.username);
    let user = await adminDetails.findOne({ name: req.body.username });
    if (!user) {
      return res.json({ status: -1 });
    }
    // console.log(user.password);
    bcrypt.genSalt(10, (err, Salt) => {
      if (err) throw err;
      var query = { name: userName };

      // Accessing the Data from the DataBase toi match the Credentials
      adminDetails.find(query, (err, result) => {
        if (err) throw err;
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
          if (!isMatch) {
            return res.json({ status: -1 });
          } else {
            // console.log("Valid Credentials");
            // res.redirect("/user/" + userName);

            // Creation of the MongoDb Doc so that it can be shared to the database
            if (club == "WebVerse") {
              Webverse.create({
                topic: req.body.topic,
                desc: req.body.desc,
                link: req.body.link,
                contenttype: req.body.type,
                by: req.body.username,
                date: Date(),
              })
                .then(() => {
                  return res.redirect("/user/" + userName);
                })
                .catch(() => {
                  return res.json({ status: -1 });
                });
            } else if (club == "AIML") {
              aiml
                .create({
                  topic: req.body.topic,
                  desc: req.body.desc,
                  link: req.body.link,
                  contenttype: req.body.type,
                  by: req.body.username,
                  date: Date(),
                })
                .then(() => {
                  return res.redirect("/user/" + userName);
                })
                .catch(() => {
                  return res.json({ status: -1 });
                });
            } else if (club == "Android") {
              android
                .create({
                  topic: req.body.topic,
                  desc: req.body.desc,
                  link: req.body.link,
                  contenttype: req.body.type,
                  by: req.body.username,
                  date: Date(),
                })
                .then(() => {
                  return res.redirect("/user/" + userName);
                })
                .catch(() => {
                  return res.json({ status: -1 });
                });
            } else if (club == "Robosapiens") {
              robotics
                .create({
                  topic: req.body.topic,
                  desc: req.body.desc,
                  link: req.body.link,
                  contenttype: req.body.type,
                  by: req.body.username,
                  date: Date(),
                })
                .then(() => {
                  return res.redirect("/user/" + userName);
                })
                .catch(() => {
                  return res.json({ status: -1 });
                });
            } else if (club == "Blockchain") {
              blockchain
                .create({
                  topic: req.body.topic,
                  desc: req.body.desc,
                  link: req.body.link,
                  contenttype: req.body.type,
                  by: req.body.username,
                  date: Date(),
                })
                .then(() => {
                  return res.redirect("/user/" + userName);
                })
                .catch(() => {
                  return res.json({ status: -1 });
                });
            } else if (club == "Electronics") {
              electronics
                .create({
                  topic: req.body.topic,
                  desc: req.body.desc,
                  link: req.body.link,
                  contenttype: req.body.type,
                  by: req.body.username,
                  date: Date(),
                })
                .then(() => {
                  return res.redirect("/user/" + userName);
                })
                .catch(() => {
                  return res.json({ status: -1 });
                });
            } else if (club == "Cyber") {
              cyber
                .create({
                  topic: req.body.topic,
                  desc: req.body.desc,
                  link: req.body.link,
                  contenttype: req.body.type,
                  by: req.body.username,
                  date: Date(),
                })
                .then(() => {
                  return res.redirect("/user/" + userName);
                })
                .catch(() => {
                  return res.json({ status: -1 });
                });
            } else {
              res.json({ status: 10 });
            }
          }
        });
      });
    });
  } catch (error) {
    res.json({ status: -1 });
  }
});


// Send data to resource page
router.get("/resource/:club", async (req, res) => {
  let club = req.params.club;
  let data;
  if (club == "WebVerse") {
    data = await Webverse.find({});
  } else if (club == "AIML") {
    data = await aiml.find({});
  } else if (club == "Android") {
    data = await android.find({});
  } else if (club == "Robosapiens") {
    data = await robotics.find({});
  } else if (club == "Blockchain") {
    data = await blockchain.find({});
  } else if (club == "Electronics") {
    data = await electronics.find({});
  } else if (club == "Cyber") {
    data = await cyber.find({});
  } else {
    data = [];
  }

  // console.log(data);

  res.render("resource.ejs", { data, club });
});


// Delete recource for data base using club name and coordinators authentication
router.post('/Rdelete/:club',async (req,res)=>{
  let club = req.params.club;
  // console.log(club);
  // console.log(req.body.id);
  try {
    let userName = req.body.username;
    let password = req.body.password;
    // console.log(req.body.username);
    let user = await adminDetails.findOne({ name: req.body.username });
    if (!user) {
      return res.json({ status: -1 });
    }
    // console.log(user.password);
    bcrypt.genSalt(10, (err, Salt) => {
      if (err) throw err;
      var query = { name: userName };

      adminDetails.find(query, (err, result) => {
        if (err) throw err;
        bcrypt.compare(password, result[0].password, async(err, isMatch) => {
          if (!isMatch) {
            return res.json({ status: -1 });
          } else {
            // console.log("Valid Credentials");
            // res.redirect("/user/" + userName);
            if (club == "WebVerse") {
              await Webverse.findOneAndRemove({_id:req.body.id});
              res.redirect(`/user/${userName}`);
            } else if (club == "AIML") {
              await aiml.findOneAndRemove({_id:req.body.id});
              res.redirect(`/user/${userName}`);
            } else if (club == "Android") {
              await android.findOneAndRemove({_id:req.body.id});
              res.redirect(`/user/${userName}`);
            } else if (club == "Robosapiens") {
              await robotics.findOneAndRemove({_id:req.body.id});
              res.redirect(`/user/${userName}`);
            } else if (club == "Blockchain") {
              await blockchain.findOneAndRemove({_id:req.body.id});
              res.redirect(`/user/${userName}`);
            } else if (club == "Electronics") {
              await electronics.findOneAndRemove({_id:req.body.id});
              res.redirect(`/user/${userName}`);
            } else if (club == "Cyber") {
              await cyber.findOneAndRemove({_id:req.body.id});
              res.redirect(`/user/${userName}`);
            } else {
              res.redirect(`/user/${userName}`);
            }
          }
        });
      });
    });
  } catch (error) {
    res.json({ status: -1 });
  }
});

module.exports = router;
