module.exports = (sequelize) => ({
    AttendanceFlag: require('./attendanceFlag.js')(sequelize),
    Holiday: require('./holidays.js')(sequelize),
    Shift: require('./shift.js')(sequelize),
    WeeklyOffDays: require('./weeklyOffDays.js')(sequelize)
});