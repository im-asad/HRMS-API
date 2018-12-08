const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Attendance = sequelize.define("usergroup", {
        attendance_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        actualInDate: {
            type: Sequelize.DATEONLY,
            defaultValue: null
        },

        actualOutDate: {
            type: Sequelize.DATEONLY,
            defaultValue: null
        },

        inDate: {
            type: Sequelize.DATEONLY
        },

        outDate: {
            type: Sequelize.DATEONLY
        },

        status: {
            type: Sequelize.STRING,
            defaultValue: "N/A"
        },

        leave: {
            type: Sequelize.BOOLEAN,
            defaultValuue: false
        },

        actualInTime: {
            type: Sequelize.TIME,
            defaultValue: null
        },

        actualOutTime: {
            type: Sequelize.TIME,
            defaultValue: null
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


    return Attendance

}