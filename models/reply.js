const { DB } = require("../database/database");
const { DataTypes } = require("sequelize");

/**
 * User mapping.
 * @name reply
 * @memberof module:database
 * @param {String} table - database table name
 * @param {Object} fields - Object with required fields
 * @returns {Function} - User object to insert or retrieve from the database
 */
const reply = DB.define(
  "Reply",
  {
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    replyBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    replied: {
      type: DataTypes.DATE,
    },
  },
  {
    // Other model options go here
  }
);
module.exports = reply;
