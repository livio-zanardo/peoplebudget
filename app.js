require("dotenv").config();
const app = require("express")();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

//
app.use(cookieParser())
app.use(bodyParser.json())

//import database
const DB = require("./database/database");

//testing route
// app.get("/", async (req, res) => {
//   res.send("hello world");
// });

// Include API Routes
const router = require("./router");
app.use("/api", router);

module.exports = app;
