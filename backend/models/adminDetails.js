const mongoose = require("mongoose");

const admin = mongoose.Schema({
  name: String,
  fname: String,
  lname: String,
  email: String,
  password: String,
  club: String,
  linkedIn: String,
  instagram: String,
  github: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("adminDetails", admin);
