const mongoose = require("mongoose");

const gs = mongoose.Schema({
  username: String,
  password: String,
  fname: String,
  lname: String,
  post: String,
  email: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("portaldetails", gs);
