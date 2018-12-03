const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const AttendanceRequest = sequelize.define("attendancerule", {
        attendanceRequest_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        effectFrequency: {
            type: Sequelize.INTEGER
        },
        flagCount: {
            type: Sequelize.INTEGER
        },
        exemptFlagCount: {
            type: Sequelize.INTEGER
        },
        exemptMinutes: {
            type: Sequelize.INTEGER
        },
        effectQuantity: {
            type: Sequelize.INTEGER
        }

    })

    return AttendanceRequest;
}