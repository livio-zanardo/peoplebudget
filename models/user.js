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
module.exports = DB.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    recoveryHash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    // Other model options go here
  }
);
