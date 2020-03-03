// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPW,
  database: process.env.DB
});

// test select statement query
connection.query("SELECT * FROM `persons`", function(err, results, fields) {
//   if (err) console.log(err);
//   else console.log(results);
});

module.exports = connection;
