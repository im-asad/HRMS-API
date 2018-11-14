const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("holiday", {
        holiday: {
            type:Sequelize.STRING,
            primaryKey:true
        },
        holiday_date: {
            type: Sequelize.STRING
        },

        holiday_remarks: {
            type:Sequelize.STRING
        }


    })
}