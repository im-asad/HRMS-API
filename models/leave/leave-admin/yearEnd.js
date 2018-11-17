const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("employee-leave-opening", {
        fromLeaveYear: {
            type: Sequelize.STRING
        },
        toLeaveYear: {
            type: Sequelize.STRING
        },
        branch: {
            type: Sequelize.STRING
        },
        group: {
            type: Sequelize.STRING
        }
    })
}