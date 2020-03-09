const { Sequelize  } = require("sequelize");
module.exports = (sequelize, type) => {
    return sequelize.define('employee', {
        first_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}
