const mongoose = require('mongoose');

const robotics = mongoose.Schema({
    topic: String,
    desc: String,
    link: String,
    contenttype: String,
    by: String,
    date: Date
})

module.exports = mongoose.model('robotics',robotics);
