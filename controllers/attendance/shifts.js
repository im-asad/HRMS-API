const models = require('../../models')
const Shift = models.Shift
const Employee = models.Employee
const Attendance = models.Attendance
const moment = require('moment-business-days')


module.exports = {
	generateMonthlyDefaultShiftsForEmployee: (machineCode)=>{
		let defaultShifts = await models.DefaultShift.findAll({where: {machineCode: machineCode}});
	
		defaultShifts.forEach(defaultShift=>{
			var startDate = moment(new Date()).subtract(1, "days");
	
		// Clone the value before .endOf()
			var endDate = moment(startDate).endOf('month');
	
				while(startDate.add(1, 'days').diff(endDate) < 0) {
				if (!startDate.isBusinessDay()){continue;}
				console.log(startDate.toDate());
				models.ScheduledShift.create({
					date: startDate.toDate(),
					machineCode: machineCode,
					shift_id: defaultShift_id
				})
			}
		})
	},

	generateMonthlyShiftForEmployee: (shift_id, machineCode)=>{
		var startDate = moment(new Date()).subtract(1, "days");
	
		// Clone the value before .endOf()
			var endDate = moment(startDate).endOf('month');
	
				while(startDate.add(1, 'days').diff(endDate) < 0) {
				if (!startDate.isBusinessDay()){continue;}
				console.log(startDate.toDate());
				models.ScheduledShift.create({
					date: startDate.toDate(),
					machineCode: machineCode,
					shift_id: shift_id
				})
				}
	}

}







// function generateMonthShifts(month) {
// 	// For each employeeShift (get shift and employee)
// 	// For each day
// 	moment()
// 		.monthBusinessDays()
// 		.forEach(date => {
// 			// TO DO: Create entry for this day.
// 		})
// }

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
