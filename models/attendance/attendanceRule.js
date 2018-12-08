const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const AttendanceRule = sequelize.define("attendancerule", {
        attendancerule_id: {
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

    AttendanceRule.associate = function (models) {
        AttendanceRule.belongsTo(models.AttendanceFlag, {
            foreignKey: "attendanceFlag_id",
            onDelete: 'CASCADE',
            hooks: true
        })
    }

    return AttendanceRule;
}