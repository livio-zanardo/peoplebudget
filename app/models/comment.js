const { DB } = require('../database/database');
const { DataTypes } = require('sequelize');

const comment = DB.define('Comment', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    commentBody: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
});
module.exports = comment;
