const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("leaveSetup", {
        leaveSetup_id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING
        },
        prefix: {
            type: Sequelize.STRING
        },
        sortIndex: {
            type: Sequelize.INTEGER
        },
        leaveType: {
            type: Sequelize.STRING
        }
    })
}