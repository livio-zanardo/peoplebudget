const { DB } = require("../database/database");
const { DataTypes } = require("sequelize");

/**
 * User mapping.
 * @name user
 * @memberof module:database
 * @param {String} table - database table name
 * @param {Object} fields - Object with required fields
 * @returns {Function} - User object to insert or retrieve from the database
 */
const securityQuestion = DB.define(
  "Security Question",
  {
    question: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    // Other model options go here
  }
);
// One role has many users 1:M
module.exports = securityQuestion;
