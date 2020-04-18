const { DB } = require("../database/database");
const { DataTypes } = require("sequelize");


const postFollow = DB.define(
      "postFollow",
      {
        followedPostId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        followingUserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
      },
      {
        // Other model options go here
      }
    );
module.exports = postFollow;
