module.exports = (sequelize) => ({
    EmployeeLeaveOpening: sequelize.import('./employeeLeaveOpening.js'),
    LeavePolicy: sequelize.import('./leavePolicy.js'),
    LeavePolicyEmployeeWise: sequelize.import('./leavePolicyEmployeeWise.js'),
    LeaveYearSetup: sequelize.import('./leaveYearSetup.js'),
    YearEnd: sequelize.import('./yearEnd.js')
});