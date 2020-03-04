/**
 * Imports
 */
require("dotenv").config();
const app = require("express")();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const router = require("./router");

/**
 * Swagger API documentation
 * use NODE_ENV=dev to access at /api-doc
 * @link https://www.npmjs.com/package/swagger-ui-express
 */
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");

/**
 * Express middleware
 */
app.use(cookieParser());
app.use(bodyParser.json());

/**
 * Database import
 */
const DB = require("./database/database");

//testing route
// app.get("/", async (req, res) => {
//   res.send("hello world");
// });

/**
 * setup API routing
 */
app.use("/api", router);
if (process.env.NODE_ENV === "dev")
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
