const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("shift", {
        shift_id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        shift_title: {
            type: Sequelize.STRING
        },

        shift_code: {
            type:Sequelize.STRING
        }, 

        shift_startingTime: {
            type:Sequelize.STRING
        },

        shift_endingTime: {
            type:Sequelize.STRING
        },

        shift_graceTime: {
            type:Sequelize.STRING
        }


    })
}