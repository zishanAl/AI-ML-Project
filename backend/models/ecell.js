const mongoose = require("mongoose");

const ecell = mongoose.Schema({
   topic:String,
   desc: String,
   link: String,
   contenttype: String,
   by:String,
   date:Date
});

module.exports = mongoose.model("ecell", ecell);