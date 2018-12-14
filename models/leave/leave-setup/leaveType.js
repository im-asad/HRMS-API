const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const LeaveType = sequelize.define("leaveType", {
        leaveType_id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: Sequelize.INTEGER
        }
    })

    return LeaveSetup;
}