const express = require("express");
const imgUpload = express.Router();
const fs = require("fs");
const path = require("path");
var admin = require("../models/adminDetails");

const upload = require("../middleware/imgUpd"); //Middleware to Upload the Image

imgUpload.post("/imageUpload/:username", upload.single("image"), (req, res) => {
  var username = req.params.username;
  var query = { name: username };
  // console.log(req.file.filename);
  var newValues = {
    image: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename) // File Sent to Uploads Folder
      ),
      contentType: "image/png",
    },
  };

  admin.findOneAndUpdate(query, newValues, null, (err, result) => {
    if (err) throw err;
    console.log("Image Uploaded");
    fs.unlinkSync(path.join(__dirname + "/uploads/" + req.file.filename)); //After Update Delete Image from the folder so that server not gets full
  });
  res.redirect("/user/" + username);
});

module.exports = imgUpload;
