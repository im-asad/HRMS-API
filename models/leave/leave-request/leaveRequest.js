const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    // Relationship to be established between requisitioner, approver and this model
    const LeaveRequest = sequelize.define("leaveRequest", {
        leaveRequest_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        leaveDate: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: "pending"
        },
        description: {
            type: Sequelize.STRING
        }
    })

    LeaveRequest.associate = function (models) {
        LeaveRequest.belongsTo(models.Attendance, {
            foreignKey: "attendance_id",
            onDelete: "CASCADE",
            hooks: true
        });
        LeaveRequest.belongsTo(models.Employee, {
            foreignKey: "requester_id",
            sourceKey: "machineCode",
            as: "requester",
            onDelete: "CASCADE",
            hooks: true
        });
        LeaveRequest.belongsTo(models.Employee, {
            foreignKey: "approver_id",
            sourceKey: "machineCode",
            as: "approver",
            onDelete: "CASCADE",
            hooks: true
        })
    }
    return LeaveRequest;
};