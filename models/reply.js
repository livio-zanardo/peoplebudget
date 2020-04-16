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
      references: {
        model: comment,
        key: "id",
      },
      allowNull: false,
    },
    replyBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);
module.exports = reply;
