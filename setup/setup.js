require("dotenv").config();
const mysql = require("mysql2/promise");
//validate env variables
if (
    !process.env.DB ||
    !process.env.DBHOST ||
    !process.env.DBUSER ||
    !process.env.DBPW ||
    !process.env.DBROOTUSER ||
    !process.env.DBROOTPW
) {
    new Error("Missing a parameter(s) in your .env file");
} else {
    (async () => {
        //database connection
        const connection = await mysql.createConnection({
            host: process.env.DBHOST,
            user: process.env.DBROOTUSER,
            password: process.env.DBROOTPW
        });
        try {
            // testing connection ////////////////////////////////////////////////////////
            // const res = await connection.execute(`select 1+1`);
            // console.log(res);
            //////////////////////////////////////////////////////////////////////////////
            console.log("Flushing old user priveleges...");
            await connection.execute(`FLUSH PRIVILEGES`);
            //////////////////////////////////////////////////////////////////////////////
            console.log("Dropping old database...");
            await connection.execute(
                `DROP DATABASE IF EXISTS ${process.env.DB}`
            );
            await connection.execute(
                `DROP DATABASE IF EXISTS ${process.env.DB}_test`
            );
            //////////////////////////////////////////////////////////////////////////////
            console.log("Crating database...");
            await connection.execute(
                `CREATE DATABASE IF NOT EXISTS ${process.env.DB}`
            );
            await connection.execute(
                `CREATE DATABASE IF NOT EXISTS ${process.env.DB}_test`
            );
            //////////////////////////////////////////////////////////////////////////////
            console.log("Dropping old database user...");
            await connection.execute(
                `DROP USER IF EXISTS ${process.env.DBUSER}`
            );
            console.log("Creating new user...");
            await connection.execute(
                `create user '${process.env.DBUSER}'@'%' identified by '${process.env.DBPW}'`
            );
            //////////////////////////////////////////////////////////////////////////////
            console.log("Granting new user all permissions (DEV ONLY!)");
            await connection.execute(
                `grant all on ${process.env.DB}.* to '${process.env.DBUSER}'@'%'`
            );
            await connection.execute(
                `grant all on ${process.env.DB}_test.* to '${process.env.DBUSER}'@'%'`
            );
            //////////////////////////////////////////////////////////////////////////////
        } catch (error) {
            console.error("Error:", error);
        } finally {
            await connection.end();
        }
    })();
}
process.on("exit", function (code) {
    console.log("Setup Complete!");
    return console.log(`Exiting with code ${code}`);
});
