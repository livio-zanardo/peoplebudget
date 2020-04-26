const { DB } = require("../database/database");
const { DataTypes } = require("sequelize");
const role = require("./role");

/**
 * User mapping.
 * @name user
 * @memberof module:database
 * @param {String} table - database table name
 * @param {Object} fields - Object with required fields
 * @returns {Function} - User object to insert or retrieve from the database
 */
const user = DB.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /*
    securityQuestion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    */
    recoveryHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
// One role has many users 1:M
role.hasMany(user);
module.exports = user;
