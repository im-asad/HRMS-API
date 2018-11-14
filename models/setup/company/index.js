module.exports = (sequelize) => ({
    AttendanceFlag: require('./attendanceFlag.js'),
    Holiday: require('./holidays.js'),
    Shift: require('./shift.js'),
    WeeklyOffDays: require('./weeklyOffDays.js')
});