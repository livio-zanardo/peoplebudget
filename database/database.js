/**
 * @module database
 */

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
  pool: pool
});

// connection test
(async () => {
  try {
    await DB.authenticate();
  } catch (error) {
    console.log(error);
  }
})();

/**
 * WIll migrate all tables or a single table.
 * @name migrate
 * @memberof module:database
 * @async
 * @function
 * @param {String} table - database table name
 * @returns {null}
 */
const migrate = async table => {
  const models = require("../models/index");
  if (table && typeof table === "String") {
    await models[table].sync({ alter: true });
  } else {
    for (const model in models) {
      await models[model].sync({ alter: true });
    }
  }
};

/**
 * WIll drop all tables or a single table.
 * @name drop
 * @memberof module:database
 * @async
 * @function
 * @param {String} table - database table name
 * @returns {null}
 */
const drop = async table => {
  const models = require("../models/index");
  if (table && typeof table === "String") {
    await models[table].drop();
  } else {
    for (const model in models) {
      await models[model].drop();
    }
  }
};

module.exports = { DB, migrate, drop };
