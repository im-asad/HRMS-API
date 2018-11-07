const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("qualificationLevel", {
        qualificationLevel_id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        qualificationLevel: {
            type: Sequelize.STRING
        },

        qualificationLevelTitle: {
            type: Sequelize.STRING
        }
    })
}