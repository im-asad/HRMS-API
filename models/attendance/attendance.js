const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Attendance = sequelize.define("usergroup", {
        attendance_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        actualIndate: {
            type: Sequelize.DATE
        },

        actualOutdate: {
            type: Sequelize.DATE
        },

        status: {
            type: Sequelize.INTEGER
        },

        leave: {
            type: Sequelize.BOOLEAN
        },

        actualInTime: {
            type: Sequelize.TIME
        },

        actualOutTime: {
            type: Sequelize.TIME
        }

    })

    Attendance.associate = function (models) {
        Attendance.belongsTo(models.Employee, {
            foreignKey: "machineCode",
            onDelete: "CASCADE",
            hook: true
        });

        Attendance.belongsTo(models.Shift, {
            foreignKey: "shift_id",
            onDelete: "CASCADE",
            hook: true
        })
    }




}