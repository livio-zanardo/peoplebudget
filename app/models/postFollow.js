const { DB } = require('../database/database');
const { DataTypes } = require('sequelize');

const postFollow = DB.define('postFollow', {
    followedPostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id'
        }
    },

    followingUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});
module.exports = postFollow;
