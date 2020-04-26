const { DB } = require("../database/database");
const { DataTypes } = require("sequelize");

/**
 * User mapping.
 * @name role
 * @memberof module:database
 * @param {String} table - database table name
 * @param {Object} fields - Object with required fields
 * @returns {Function} - role object to insert or retrieve from the database
 */
const role = DB.define(
    "Role",
    {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here
    }
);
module.exports = role;
