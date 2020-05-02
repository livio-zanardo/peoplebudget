const { DB } = require('../database/database');
const { DataTypes } = require('sequelize');

const securityQuestion = DB.define(
    'securityQuestion',
    {
        securityQuestion: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        // Other model options go here
    }
);
module.exports = securityQuestion;
