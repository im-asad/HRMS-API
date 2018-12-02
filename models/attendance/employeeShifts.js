const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const EmployeeShift = sequelize.define("employeeShifts", {
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

    EmployeeShift.associate = function (models) {
        EmployeeShift.belongsTo(models.Shift, {
            foreignKey: "shift_id"
        });
        EmployeeShift.belongsTo(models.Employee, {
            foreignKey: "machineCode"
        });

    }

    return EmployeeShift;
}