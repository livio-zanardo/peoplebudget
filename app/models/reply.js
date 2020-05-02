const { DB } = require('../database/database');
const { DataTypes } = require('sequelize');

/**
 * User mapping.
 * @name reply
 * @memberof module:database
 * @param {String} table - database table name
 * @param {Object} fields - Object with required fields
 * @returns {Function} - User object to insert or retrieve from the database
 */
const reply = DB.define(
    'Reply',
    // Join
    {
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false
            /* references: {
        model: "Comments",
        key: "commentId"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"*/
        },
        replyBody: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    },
    {
        // Other model options go here
    }
);
module.exports = reply;
