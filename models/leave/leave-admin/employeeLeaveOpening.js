const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("employeeLeaveOpening", {
        year: {
            type: Sequelize.STRING
        },
        startDate: {
            type: Sequelize.STRING
        },
        endDate: {
            type: Sequelize.INTEGER
        },
        isCurrentYear: {
            type: Sequelize.STRING
        }
    })
};