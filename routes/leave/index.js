const router = require('express').Router()
const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = sequelize => {
	const models = require('../../models')(sequelize)

	router.post('/request', async (req, res) => {
		// create attendance request
		let leave = req.body.data
		// to do: add requester id
		let employee = await models.Employee.findOne({
			where: {
				machineCode: req.body.machineCode,
			},
		})
		if (employee.leaveBalance < 1) {
			return res.sendStatus(429)
		}
		models.LeaveRequest.create(leave)
			.then(() => {
				res.sendStatus(200)
			})
			.catch(e => {
				console.log(e)
				res.sendStatus(400)
			})
	})

	router.put('/request', async (req, res) => {
		// TO DO: admin middleware

		// find attendances of that employee on that day
		// mark their status as Leave

		// params: machineCode, leaveRequest_id,

		let request = await models.LeaveRequest.findOne({
			where: {
				leaveRequest_id: req.body.data.leaveRequest_id,
			},
		})

		if (!request) {
			return res.sendStatus(400)
		}

		let machineCode = request.requester_id

		if (req.body.data.status === 'declined') {
			await request.update({
				status: req.body.status,
			})
			// TO DO: send mail to employee
			let employee = await models.Employee.findOne({
				where: {
					machineCode: machineCode,
				},
			})

			await employee.update({
				leaveBalance: employee.leaveBalance + 1,
			})
			return res.sendStatus(200)
		} else if (req.body.data.status === 'accepted') {
			// TO DO: set approver id
			await request.update({
				status: req.body.status,
			})
		}

		await models.Attendance.update(
			{
				actualInTime: req.body.data.inTime,
				actualOutTime: req.body.data.outTime,
				actualInDate: req.body.data.inDate,
				actualOutDate: req.body.data.outDate,
			},
			{
				where: {
					attendance_id: req.body.data.attendance_id,
				},
			}
		)

		await models.AttendanceRequest.update(
			{
				status: req.body.data.status,
			},
			{
				where: {
					attendanceRequest_id: req.body.data.attendanceRequest_id,
				},
			}
		)

		res.sendStatus(200)
	})

	return router
}
