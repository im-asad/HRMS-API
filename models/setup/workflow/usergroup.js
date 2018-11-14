const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("usergroup", {
        usergroup_id: {
            type:Sequelize.STRING,
            primaryKey:true,
            autoIncrement: true
        },
        usergroup: {
            type: Sequelize.STRING
        }

    })
}