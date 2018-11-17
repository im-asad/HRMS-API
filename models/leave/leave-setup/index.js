module.exports = (sequelize) => ({
    LeaveSetup: sequelize.import('./leaveType.js'),
});