const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const ScheduledShift = sequelize.define("scheduledShifts", {
        employeeShift_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        // shift id and employee id fks

        date: {
            type: Sequelize.DATEONLY
        }

    })

    ScheduledShift.associate = function (models) {
        ScheduledShift.belongsTo(models.Shift, {
            foreignKey: "shift_id",
            onDelete: 'CASCADE',
            hooks: true
        });
        ScheduledShift.belongsTo(models.Employee, {
            foreignKey: "machineCode",
            onDelete: 'CASCADE',
            hooks: true
        });

    }

    return ScheduledShift;
}