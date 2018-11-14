const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("weeklyOffDays", {
        day: {
            type:Sequelize.STRING,
            primaryKey:true,
            autoIncrement: true
        },
        off: {
            type: Sequelize.BOOLEAN
        }
    })
}