const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("usergroup", {
        usergroup_id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        usergroup: {
            type: Sequelize.STRING
        }

    })
}