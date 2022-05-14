const { default: mongoose } = require("mongoose");


const android = mongoose.Schema({
    topic: String,
    desc: String,
    link: String,
    contenttype: String,
    by: String,
    date: Date
});

module.exports = mongoose.model('android',android);