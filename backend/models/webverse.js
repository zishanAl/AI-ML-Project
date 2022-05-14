const mongoose = require("mongoose");

const webverse = mongoose.Schema({
  topic: String,
  desc: String,
  link: String,
  contenttype: String,
  by: String,
  date: Date,
});

module.exports = mongoose.model("webverse", webverse);
