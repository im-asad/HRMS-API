const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("status", {
        status_id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        status: {
            type: Sequelize.STRING
        }
    })
}