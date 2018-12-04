const router = require('express').Router()
const moment = require('moment')

module.exports = (sequelize, transporter) => {
	const models = require('../../models')(sequelize)
	const Employee = models.Employee

	router.get('/birthdays', async (req, res) => {
		let employees = await Employee.findAll({
			where: {
				$or: [
					{
						birthDate: {
							$lt: moment()
								.add(3, 'months')
								.calendar(),
						},
					},
					{
						birthDate: {
							$gt: moment()
								.subtract(3, 'months')
								.calendar(),
						},
					},
				],
			},
			attributes: ['employee_name', 'birthDate'],
		})

		return employees.map(r => {
			return r.dataValues
		})
	})

	router.post('/', async (req, res) => {
		// TO DO: check permission

		try {
			await Employee.create(req.body)

			const mailOptions = {
				from: 'nurturebot.mailer@gmail.com',
				to: 'mdaniyal.kh@gmail.com',
				subject: 'Your Circle account is now active',
				text:
					'Your circle account username: ' +
					req.body.username +
					' is now active. Your password is: ' +
					req.body.password,
			}

			transporter.sendMail(mailOptions, function(error, info) {
				if (error) {
					console.log(error)
					return res.sendStatus(500)
				} else {
					console.log('Email sent: ' + info.response)
					return res.sendStatus(200)
				}
			})
		} catch (e) {
			console.log('ERROR CREATING EMPLOYEE:', e)
			return res.sendStatus(400)
		}
	})

	router.put('/', async (req, res) => {
		let obj = req.body
		let allowed_keys = [
			'CNIC',
			'mobileNo',
			'email',
			'address',
			'permanentAddress',
			'emergencyNumber',
			'password',
		]
		for (key in obj) {
			if (!allowed_keys.includes(key)) {
				delete obj[key]
			}
		}
		Employee.update(obj, {
			where: {
				machineCode: req.body.machineCode,
			},
		})
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
				include: [
					{
						all: true,
					},
				],
			})
			return res.json(empData.dataValues)
		} catch (e) {
			console.log('ERROR FETCHING PROFILE')
			return res.sendStatus(400)
		}
	})

	router.post('/shifts', async (req, res) => {
		let obj = req.body.data
		let shiftDetails = obj.shiftDetails
		delete obj['shiftDetails']
		await models.Shift.create(obj).then(createdShift => {
			shiftDetails.forEach(shift => {
				models.ShiftFlag.create({
					shift_id: createdShift.shift_id,
					from: shift.from,
					to: shift.to,
					attendanceFlag_id: shift.attendanceFlag_id,
				})
			})
		})

		return res.sendStatus(200)
	})

	router.put('/shifts/create', async (req, res) => {
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
				shift_id: updatedShift.shift_id,
				from: shift.from,
				to: shift.to,
				attendanceFlag_id: shift.attendanceFlag,
			})
		})
		return res.sendStatus(200)
	})
	return router
}
