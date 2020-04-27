const { DB } = require("../database/database");
const { DataTypes } = require("sequelize");

const comment = DB.define("Comment", {
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    commentbody: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
});
module.exports = comment;
