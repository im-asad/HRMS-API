module.exports = (sequelize) => ({
    LeaveRequest: sequelize.import('./leaveRequest.js'),
    LeavePolicy: sequelize.import('./leavePolicy.js')
});