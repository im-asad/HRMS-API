const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const AttendanceRequest = sequelize.define("attendanceRequest", {
        attendanceRequest_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        inDate: {
            type: Sequelize.DATE
        },

        outDate: {
            type: Sequelize.DATE
        },
        inTime: {
            type: Sequelize.TIME
        },

        outTime: {
            type: Sequelize.TIME
        },
       
        description: {
            type: Sequelize.STRING
        },

        status: {
            type: Sequelize.STRING
        }

    })
    
    AttendanceRequest.associate = function(models){
        AttendanceRequest.belongsTo(models.Attendance, {foreignKey: "attendance_id", onDelete: "CASCADE", hooks: true});
        AttendanceRequest.belongsTo(models.Employee, {foreignKey: "requester_id", sourceKey: "machineCode", as: "requester", onDelete: "CASCADE", hooks: true});
        AttendanceRequest.belongsTo(models.Employee, {foreignKey: "approver_id", sourceKey: "machineCode", as: "approver", onDelete: "CASCADE", hooks: true})
    }

    return AttendanceRequest;
}