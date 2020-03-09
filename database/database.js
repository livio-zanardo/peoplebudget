// get the client
const seq = require("sequelize");

const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};

const DB = new seq(process.env.DB, process.env.DBUSER, process.env.DBPW, {
  host: process.env.DBHOST,
  dialect: "mysql",
  /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  pool: pool
});

(async () => {
  try {
    await DB.authenticate();
  } catch (error) {
    console.log(error);
  }
})();

module.exports = DB;
