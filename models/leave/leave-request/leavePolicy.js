const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    // Relationship to be established between requisitioner, approver and this model
    return sequelize.define("leavePolicy", {
        leaveDays: {
            type: Sequelize.INTEGER,
        },
        absentPenalty: {
            type: Sequelize.FLOAT
        },
        latePenalty: {
            type: Sequelize.FLOAT
        }
    })

};