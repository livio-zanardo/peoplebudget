require("dotenv").config();
const { DB, migrate, drop } = require("../database/database");
switch (process.env.DBOP) {
  case "migrate":
    console.log("Migrating tables...");
    migrate(process.env.table);
    return;
  case "drop":
    console.log("Dropping tables...");
    drop(process.env.table);
    return;
  default:
    console.log(
      "Please add 'DBOP' in the environment variable, you can also specific 'TABLE'"
    );
    return;
}
