const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connect = require("./backend/db");
const app = express();
connect();

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/"));

app.use("/", require("./backend/routes/clubs"));
app.use("/", require("./backend/routes/login"));
app.use("/", require("./backend/routes/register"));
app.use("/", require("./backend/routes/show"));
app.use("/", require("./backend/routes/update"));
app.use("/", require("./backend/routes/imgUpload"));
app.use("/", require("./backend/routes/gsAdmin"));
app.use("/", require("./backend/routes/mPortal"));
app.use("/", require("./backend/routes/Resource"));
app.use("/", require("./backend/routes/news"));
app.use("/", require("./backend/routes/updPassword"));

app.listen(process.env.PORT || 5000, process.env.IP, () =>
  console.log("Server is Running at PORT 5000....")
);
