module.exports = sequelize => ({
	AttendanceFlag: sequelize.import('./attendanceFlag.js'),
	Holiday: sequelize.import('./holidays.js'),
	Shift: sequelize.import('./shift.js'),
	WeeklyOffDays: sequelize.import('./weeklyOffDays.js'),
})
