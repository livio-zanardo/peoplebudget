const { DB } = require("../database/database");
const { DataTypes } = require("sequelize");

const postFollow = DB.define(
  "postFollow",
  {
    followedPostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },

    followingUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    // Other model options go here
  }
);
module.exports = postFollow;
