const Sequelize = require("sequelize");

module.exports = (sequelize) => {

    return sequelize.define("group", {
        group_id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        group: {
            type: Sequelize.STRING
        }
    })
}