module.exports = (sequelize) => ({
    LeaveRequest: sequelize.import('./leaveRequest.js'),
});