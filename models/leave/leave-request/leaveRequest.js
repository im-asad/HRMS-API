const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    // Relationship to be established between requisitioner, approver and this model
    const LeaveRequest = sequelize.define("leaveRequest", {

       // To do: link with leave type

       leaveRequest_id: {
           type: Sequelize.FLOAT,
           primaryKey: true,
           autoIncrement: true
       },

        leaveDate: {
            type: Sequelize.DATE
        },

        status: {
            type: Sequelize.STRING,
            defaultValue: "pending"
        }

    })

    // To do: link requester and approver
    LeaveRequest.associate = function(models){
        LeaveRequest.belongsTo(models.Employee, {foreignKey: "requester_id", sourceKey: "machineCode", as: "requester", onDelete: "CASCADE", hooks: true});
        LeaveRequest.belongsTo(models.Employee, {foreignKey: "approver_id", sourceKey: "machineCode", as: "approver", onDelete: "CASCADE", hooks: true})
    }
    
    return LeaveRequest;
};