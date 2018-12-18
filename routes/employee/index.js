const router = require('express').Router()
const moment = require('moment')
const randomstring = require('randomstring')
const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, transporter) => {
	const attendanceController = require('../../controllers/attendance/shifts.js')(sequelize)
	const models = require('../../models')(sequelize)
	const Employee = models.Employee

	router.get('/', async (req, res) => {
		let employees = await Employee.findAll({})
		res.json({
			status: 200,
			employees
		})
	})



	router.post('/create', async (req, res) => {

		console.log("IN THe")
		// TO DO: check permission
		try {
			let data = req.body.data
			Object.keys(data).forEach(element => {
				if (data[element] === '') {
					data[element] = null
				}
			})

			const password = randomstring.generate({
				length: 10,
				charset: 'alphabetic'
			});

			const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
			const hash = bcrypt.hashSync(password, salt);

			data.password = hash;

			const createdEmployee = await Employee.create(data)

			const { employeeName, username } = createdEmployee.dataValues;
			let html = `<p style="font-family: 'monospace', font-size: 14px">Hello ${employeeName}, your account is all setup. You can use the following credentials to login.</p>` +
				`<div style="font-family: 'Courier New'"><b>Username: </b> ${username}</>` +
				`<div style="font-family: 'Courier New'"><b>Password: </b> ${password}</div>`;

			const mailOptions = {
				from: 'Circle Bot <mailer.circle@gmail.com>',
				to: data.email,
				subject: 'Your Circle account is now active',
				html
			}

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error)
					return res.sendStatus(500)
				} else {
					console.log("EMAIL SENT");
					return res.sendStatus(200)
				}
			})
		} catch (e) {
			console.log(e)
			return res.sendStatus(400)
		}
	})

	router.put('/', async (req, res) => {
		const employeeDetails = Object.assign({}, req.body)
		const machineCode = req.body.machineCode
		let allowed_keys = [
			'CNIC',
			'mobileNo',
			'email',
			'address',
			'permanentAddress',
			'emergencyNumber',
			'password',
			'profileImage',
			'maritalStatus',
		]
		for (key in employeeDetails) {
			if (!allowed_keys.includes(key)) {
				delete employeeDetails[key]
			}
		}
		const updateStatus = await Employee.update(employeeDetails, {
			where: {
				machineCode,
			},
		})

		if (updateStatus) {
			const updatedEmployee = await Employee.findOne({
				where: {
					machineCode
				}
			})
			res.json({
				status: 200,
				employee: updatedEmployee
			})
		} else {
			res.json({
				status: 500,
				message: 'Cannot update employee'
			})
		}
	})

	router.get('/formData', async (req, res) => {
		let promises = []
		promises.push(models.City.findAll())
		promises.push(models.Country.findAll())
		promises.push(models.Designation.findAll())
		promises.push(models.Branch.findAll())
		promises.push(models.Division.findAll())
		promises.push(models.Department.findAll())
		promises.push(models.SubDepartment.findAll())
		promises.push(models.LeavingReason.findAll())
		promises.push(models.SubLeavingReason.findAll())
		promises.push(
			models.Employee.findAll({
				attributes: ['employee_name', 'machineCode'],
			})
		)
		promises.push(models.UserGroup.findAll())
		promises.push(models.WorkflowGroup.findAll())

		let values = await Promise.all(promises)
		values.map(result => {
			result.map(r => r.dataValues)
		})
		return res.json(values)
	})

	router.get('/profile/:code', async (req, res) => {
		try {
			let empData = await Employee.findOne({
				where: {
					machineCode: req.params.code,
				},
				include: [{
					all: true,
				}, ],
			})
			return res.json(empData.dataValues)
		} catch (e) {
			console.log(e)
			console.log('ERROR FETCHING PROFILE')
			return res.sendStatus(400)
		}
	})

	router.post('/shifts/create', async (req, res) => {
		let obj = req.body.data
		let shiftDetails = obj.shiftDetails
		delete obj['shiftDetails']
		await models.Shift.create(obj).then(createdShift => {
			shiftDetails.forEach(shift => {
				models.ShiftFlag.create({
					shift_id: createdShift.shift_id,
					from: shift.from,
					to: shift.to,
					shiftType: shift.shiftType,
					attendanceFlag_id: shift.attendanceFlag_id,
				})
			})
		})

		return res.sendStatus(200)
	})

	router.post('/shifts/update', async (req, res) => {
		let obj = req.body.data
		let shiftDetails = obj.shiftDetails
		delete obj['shiftDetails']

		let updatedShift = await models.Shift.update(obj, {
			where: {
				shift_id: obj.shift_id,
			},
		})

		await models.ShiftFlag.destroy({
			where: {
				shift_id: obj.shift_id,
			},
		})

		shiftDetails.forEach(shift => {
			models.ShiftFlag.create({
				shift_id: obj.shift_id,
				from: shift.from,
				to: shift.to,
				attendanceFlag_id: shift.attendanceFlag_id,
			})
		})
		return res.sendStatus(200)
	})

	router.post('/shifts/read', async (req, res) => {
		sequelize
			.query('SELECT * FROM shifts INNER JOIN shiftFlags USING (shift_id) ORDER BY shift_id ', {
				type: sequelize.QueryTypes.SELECT,
			})
			.then(shifts => {
				let response = []
				let prevId = -1
				shifts.forEach(shift => {
					if (prevId !== shift.shift_id) {
						response.push({
							shift_id: shift.shift_id,
							shiftTitle: shift.shiftTitle,
							shiftCode: shift.shiftCode,
							shiftStartingTime: shift.shiftStartingTime,
							shiftEndingTime: shift.shiftEndingTime,
							shiftGraceTime: shift.shiftGraceTime,
							shiftDetails: [],
						})
					}
					response[response.length - 1].shiftDetails.push({
						attendanceFlag_id: shift.attendanceFlag_id,
						from: shift.from,
						to: shift.to,
						shiftType: shift.shiftType,
					})
					prevId = shift.shift_id
				})
				return res.json(response)
			})
	})

	router.get('/defaultshifts/:machineCode/', async (req, res) => {
		// TO DO: check admin or machineCode

		let defaultShifts = await models.DefaultShift.findAll({
			where: {
				machineCode: req.params.machineCode
			},
			include: [models.Shift],
		}).catch(e => {
			console.log(e)
			return res.sendStatus(400)
		})
		return res.json(defaultShifts)
	})

	router.delete('/defaultshifts', async (req, res) => {
		// TO DO: check admin

		let deletedShift = await models.DefaultShift.find({
			where: {
				defaultShift_id: req.body.defaultShift_id
			},
		})

		await models.DefaultShift.destroy({
			where: {
				defaultShift_id: req.body.defaultShift_id
			}
		})
		// TO DO: send mail
		await models.Attendance.destroy({
			where: {
				machineCode: deletedShift.machineCode,
				shift_id: deletedShift.shift_id,
				inDate: {
					$gt: moment().toDate()
				},
			},
		})

		res.sendStatus(200)
	})

	router.post('/defaultshifts', async (req, res) => {
		// TO DO: check admin
		models.DefaultShift.create(req.body.data)
		attendanceController.generateMonthlyShiftForEmployee(
			req.body.data.shift_id,
			req.body.data.machineCode
		) 

		// TO DO: send mail
		res.sendStatus(200)
	})

	router.post('/customshift', async (req, res) => {
		attendanceController.addCustomShift(req.body.data.shift_id, req.body.data.machineCode, req.body.date)
	})

	router.get("/test", async (req, res) => {
		attendanceController.processWeeklyAttendance();
	})


	return router
}