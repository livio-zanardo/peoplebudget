require("dotenv").config();
const { exec } = require("child_process");
const SQL = require("sql-template-strings");
const mysql = require("mysql2/promise");
(async () => {
  //setup database
  const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBROOTUSER,
    password: process.env.DBROOTPW
  });
  try {
    console.log("Flushing old user priveleges..");
    await connection.execute(`FLUSH PRIVILEGES`);
    console.log("Dropping old database..");
    await connection.execute(`DROP DATABASE IF EXISTS ${process.env.DB}`);
    console.log("Crating database..");
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB}`);
    console.log("Dropping old database use..");
    await connection.execute(`DROP USER IF EXISTS ${process.env.DBUSER}`);
    console.log("Creating new user..");
    await connection.execute(
      `create user '${process.env.DBUSER}'@'%' identified by '${process.env.DBPW}'`
    );
    console.log("Granting new user all permissions (DEV ONLY!)");
    await connection.execute(
      `grant all on ${process.env.DB}.* to '${process.env.DBUSER}'@'%'`
    );
    //generate keys
    console.log("Launching setup.sh...");
    const shell = exec(`sh ${process.env.SETUP}`);
    shell.stdout.on("data", data => {
      console.log(data);
    });
    shell.stderr.on("data", data => {
      console.error(`stderr: ${data}`);
    });
    shell.on("close", code => {
      console.log(`child process exited with code ${code}`);
    });
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end();
  }
})();

process.on("exit", function(code) {
  console.log("Setup Complete!");
  return console.log(`Exiting with code ${code}`);
});
