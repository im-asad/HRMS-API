module.exports = sequelize => ({
	Attendance: sequelize.import('./attendance.js'),
	AttendanceRequest: sequelize.import('./attendanceRequest.js'),
	AttendanceRule: sequelize.import('./attendanceRule.js'),
	DefaultShift: sequelize.import("./defaultShift.js"),
	ScheduledShift: sequelize.import('./scheduledShift.js'),
})
