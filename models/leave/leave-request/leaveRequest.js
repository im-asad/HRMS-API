const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    // Relationship to be established between requisitioner, approver and this model
    return sequelize.define("leaveRequest", {
        leaveYear: {
            type: Sequelize.STRING
        },
        leaveType: {
            type: Sequelize.STRING
        },
        balance: {
            type: Sequelize.FLOAT
        },
        isShortLeave: {
            type: Sequelize.BIGINT
        },
        shortLeaveValue: {
            type: Sequelize.FLOAT
        },
        shortLeaveTime: {
            type: Sequelize.STRING
        },
        leaveFrom: {
            type: Sequelize.DATE
        },
        leaveTo: {
            type: Sequelize.DATE
        }
    })
};