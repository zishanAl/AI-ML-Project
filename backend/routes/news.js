const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const adminDetails = require("../models/adminDetails");
const news = require("../models/news");
const newsrouter = express.Router();

// Add news to data base using authentication

newsrouter.post("/newsadd/:username", async (req, res) => {
  // console.log()
  try {
    let userName=req.params.username;
    let fName = req.body.fname;
    let password = req.body.password;
    // console.log(req.body.username);
    // fetch the coordinators and check the password 
    let user = await adminDetails.findOne({ fname: fName });
    if (!user) {
      return res.json({ status: -1 });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) {
          res.json({ status: -1 });
        } else {
          // if all authentication is right then upload news to data base
            news
            .create({
                topic: req.body.topic,
                desc: req.body.desc,
                link: req.body.link,
                by: req.body.fname,
                date: Date(),
            })
            .then(() => {
                return res.redirect("/user/"+userName);
            })
            .catch(() => {
                return res.json({ status: -1 });
            });
            }
        });
  } catch (error) {
    res.redirect("/user/"+userName);
  }
});

// Deletion of News if added
newsrouter.post('/Newsdelete/:user',async(req,res)=>{
  try {
    let userName = req.body.username;
    let password = req.body.password;
    // console.log(req.body.username);
    let user = await adminDetails.findOne({ name: req.body.username });
    if (!user) {
      return res.json({ status: -1 });
    }
    // console.log(user.password);

    // Matching of password other one can not able to access in any way
    bcrypt.genSalt(10, (err, Salt) => {
      if (err) throw err;
      var query = { name: userName };

      adminDetails.find(query, (err, result) => {
        if (err) throw err;
        bcrypt.compare(password, result[0].password, async(err, isMatch) => {
          if (!isMatch) {
            return res.json({ status: -1 });
          } else {
            
            await news.findOneAndDelete({_id:req.body.id});
            return res.redirect("/user/"+userName);
          }
        });
      });
    });
  } catch (error) {
    return res.redirect("/user/"+userName);
  }
})

module.exports = newsrouter;
