const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const ShiftFlag = sequelize.define("shiftFlag", {
        shiftFlag_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        from: {
            type: Sequelize.TIME
        },

        to: {
            type: Sequelize.TIME
        },
        
        shiftType: {
            type: Sequelize.STRING
        }
    })



    ShiftFlag.associate = function (models) {
        ShiftFlag.belongsTo(models.Shift, {
            foreignKey: "shift_id"
        });
        ShiftFlag.belongsTo(models.AttendanceFlag, {
            foreignKey: "attendanceFlag_id"
        })
    }

    return ShiftFlag;
}