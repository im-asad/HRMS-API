const models = require('../../models')
const Shift = models.Shift
const Employee = models.Employee
const Attendance = models.Attendance
const moment = require('moment-business-days')

function generateMonthShifts(month) {
	// For each employeeShift (get shift and employee)
	// For each day
	moment()
		.monthBusinessDays()
		.forEach(date => {
			// TO DO: Create entry for this day.
		})
}

function setEmployeeShift(employee_code, shift_id, date) {
	Attendance.create({
		machineCode: employee_code,
		shift_id: shift_id,
		date: date,
		status: 'N/A',
		leave: false,
	})
}

function getAttendanceDetails(employee, startDate, endDate) {
	// For each attendance entry of that employee
	// return details
}

function recordTime(type, time) {
	// if type is outgoing, then update status
}
