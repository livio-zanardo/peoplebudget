require("dotenv").config();
const { migrate, drop } = require("../database/database");
switch (process.env.DBOP) {
    case "migrate":
        console.log("Migrating tables...");
        migrate(process.env.table);
        break;
    case "drop":
        console.log("Dropping tables...");
        drop(process.env.table);
        break;
    default:
        console.log(
            "Please add 'DBOP' in the environment variable, you can also specific 'TABLE'"
        );
        break;
}
