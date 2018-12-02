const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("usergroup", {
        attendance_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        scheduledInDateTime: {
            type: Sequelize.DATE
        },

        scheduledOutDateTime: {
            type: Sequelize.DATE
        },

        inDateTime: {
            type: Sequelize.DATE
        },

        outDateTime: {
            type: Sequelize.DATE
        },

        day: {
            type: Sequelize.STRING
        },

        status: {
            type: Sequelize.INTEGER
        },

        leave: {
            type: Sequelize.BOOLEAN
        }


    })
}