const moment = require('moment-business-days')
const Op = require('sequelize').Op

module.exports = (sequelize) => {
const models = require('../../models')(sequelize)



	/*
		Function to process single attendance entry. Determines if the employee was present, late or absent
		Deducts leave credits if the employee is late or absent as defined in the leave policy.
		This is a helper method used by processWeeklyAttendance function.
	*/
	let processAttendance = async attendance_id => {
		let leavePolicy = await models.LeavePolicy.findOne({
			where: {
				id: 1
			}
		});

		let attendance = await models.Attendance.findOne({
			where: {
				attendance_id: attendance_id,
			},
			include: [models.Shift],
		});



		if (attendance.status === 'L') {
			return
		}

		if (attendance.actualInDateTime === null || attendance.actualOutDateTime === null) {
			await attendance.update({
				status: 'A',
			})
			deductLeaveCredit(attendance.machineCode, leavePolicy.absentPenalty);
			return
		}

		let actualInDateTime = moment(attendance.actualInDate + ' ' + attendance.actualInTime)
		let actualOutDateTime = moment(attendance.actualOutDate + ' ' + attendance.actualOutTime)
		let inDateTime = moment(attendance.inDate + '  ' + attendance.shift.shiftStartingTime)
		let outDateTime = moment(attendance.outDate + ' ' + attendance.shift.shiftEndingTime)

		if (
			actualInDateTime.isBefore(inDateTime) ||
			actualInDateTime.diff(inDateTime, 'minutes') <= attendance.shift.graceTime
		) {
			// arrived on time
			if (
				actualOutDateTime.isAfter(outDateTime) ||
				outDateTime.diff(actualOutDateTime, 'minutes') <= attendance.shift.graceTime
			) {
				//  left on time
				await attendance.update({
					status: 'P',
				})
				return
			}

			// check how late the person was
			let lateMinutes = 0
			lateMinutes += outDateTime.diff(actualOutDateTime, 'minutes')
			lateMinutes += actualInDateTime.diff(inDateTime, 'minutes')
			if (lateMinutes <= 60) {
				// mark late
				await attendance.update({
					status: 'Late',
				})
				deductLeaveCredit(attendance.machineCode, leavePolicy.latePenalty);
				return
			} else if (lateMinutes > 60) {
				await attendance.update({
					status: 'A',
				})
				deductLeaveCredit(attendance.machineCode, leavePolicy.absentPenalty);
				return
			}
		}
		await attendance.update({
			status: 'A',
		})
		deductLeaveCredit(attendance.machineCode, leavePolicy.absentPenalty);
		return
	}

	/*
		Helper function used by processAttendance. Deducts leave balance equal to deductAmount
		from employee with machine code machineCode
	*/
	let deductLeaveCredit = async (machineCode, deductAmount) => {
		let employee = await models.Employee.findOne({
			where: {
				machineCode: machineCode
			}
		});

		employee.update({
			leaveBalance: parseFloat(employee.leaveBalance) - deductAmount
		});

	}

	/*
		helper function used by generateMonthlyShifts. Generates current month's attendance entries
		for the employee with the machine code machineCode 
	*/
	async function generateMonthlyDefaultShiftsForEmployee(machineCode) {
		let defaultShifts = await models.DefaultShift.findAll({
			where: {
				machineCode: machineCode,
			},
		})

		defaultShifts.forEach(defaultShift => {
			var startDate = moment(new Date()).subtract(1, 'days')

			// Clone the value before .endOf()
			var endDate = moment(startDate).endOf('month')

			while (startDate.add(1, 'days').diff(endDate) < 0) {
				if (!startDate.isBusinessDay()) {
					continue
				}

				let nextDay = moment(startDate)
				nextDay.add(1, 'day')
				models.Attendance.create({
					machineCode: machineCode,
					shift_id: defaultShift_id,
					inDate: startDate.toDate(),
					outDate: Date(defaultShift.shiftStartingTime) > Date(defaultShift.ending) ?
						nextDay.toDate() : startDate.toDate(),
				})
			}
		})
	}

	return {
		// generates the monthly attendance for an employee according to all the assigned default
		// shifts of that employee
		generateMonthlyShifts: async ()=>{
			let employees = models.findAll({});

			employees.forEach(employee=>{
				generateMonthlyDefaultShiftsForEmployee(employee.machineCode);
			})
		}, 
		
		/*
			Generates the montly attendance for an employee with machine code machineCode for a particular
			shift with id shift_id
		*/
		generateMonthlyShiftForEmployee: async (shift_id, machineCode) => {
			var startDate = moment(new Date()).subtract(1, 'days')

			// Clone the value before .endOf()
			var endDate = moment(startDate).endOf('month')

			let nextDay = moment(startDate)
			nextDay.add(1, 'day')
			while (startDate.add(1, 'days').diff(endDate) < 0) {
				if (!startDate.isBusinessDay()) {
					continue
				}
				console.log(startDate.toDate())
				console.log('Attendance Model', models.Attendance)
				let defaultShift = await models.Shift.find({
					where: {
						shift_id: shift_id,
					},
				})
				models.Attendance.create({
					outDate: Date(defaultShift.shiftStartingTime) > Date(defaultShift.ending) ?
						nextDay.toDate() : startDate.toDate(),
					inDate: startDate.toDate(),
					machineCode: machineCode,
					shift_id: shift_id,
				})
			}
		},

		/*
			Adds a single attendance entry for an employee with machine code machineCode 
			having a shift with id shift_id
			on date
		*/
		addCustomShift: (shift_id, machineCode, date) => {
			date = moment(date)
			let nextDay = moment(date)
			nextDay.add(1, 'day')

			models.Attendance.create({
				inDate: date.toDate(),
				outDate: Date(defaultShift.shiftStartingTime) > Date(defaultShift.ending) ?
					nextDay.toDate() : startDate.toDate(),
				machineCode: machineCode,
				shift_id: shift_id,
			})
		},

		/*
			Processes all of last week's attendance.
			Determines the status for each attendance entry. (Absent, Leave, Late, Present)
			Also deducts leave credits in case employee was not on time. 
		*/
		processWeeklyAttendance: async () => {
			let currentDate = moment()
			let weekAgo = moment().subtract(7, 'days')

			let attendances = await models.Attendance.findAll({
				where: {
					inDate: {
						[Op.between]: [weekAgo.toDate(), currentDate.toDate()],
					},
				},
			})

			console.log('\n\n\nattendances: ', attendances)
			attendances.forEach(attendance => {
				processAttendance(attendance.attendance_id)
			})
		},
	}
}