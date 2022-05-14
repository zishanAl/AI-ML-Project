const mongoose = require("mongoose");

const news = mongoose.Schema({
   topic:String,
   desc: String,
   link: String,
   by:String,
   date: Date
});

module.exports = mongoose.model("news", news);
