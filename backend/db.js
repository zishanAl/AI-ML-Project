const mongoose = require("mongoose");
// database url 
var url =
  "mongodb+srv://technical_iiitbh:tech%40iiitbh@cluster0.fxlpp.mongodb.net/admin_details?retryWrites=true&w=majority";

// database connection to our node server 
const connect = async () => {
  try {
    await mongoose.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        console.log("DataBase Connected");
      }
    );
  } catch (error) {
    console.log("Data Base is not connected");
  }
};

module.exports=connect;