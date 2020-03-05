//imports
require("dotenv").config();
const app = require("express")();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = require("./router");
const {errorHandler} = require('./middleware/error.handler')
//Swagger API documentation
//use NODE_ENV=dev to access at /api-doc
//https://www.npmjs.com/package/swagger-ui-express
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
//Express middleware
app.use(cookieParser());
app.use(bodyParser.json());
//Database import
const DB = require("./database/database");
//setup API routing
app.use("/api", router);
if (process.env.NODE_ENV === "dev")
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler)
module.exports = app;
