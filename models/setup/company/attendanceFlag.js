const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("attendanceFlag", {
        attendanceFlag_id: {
            type:Sequelize.STRING,
            primaryKey:true,
            autoIncrement: true
        },
        attendanceFlag: {
            type: Sequelize.STRING
        },

        attendanceFlag_category: {
            type:Sequelize.STRING
        },

        effectBy: {
            type: Sequelize.STRING
        },

        attendanceFlag_type: {
            type: Sequelize.STRING
        },

        attendanceFlag_value: {
            type: Sequelize.FLOAT
        }


    })
}