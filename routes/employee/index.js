const router = require('express').Router()
const moment = require('moment')

module.exports = (sequelize, transporter) => {
	const models = require('../../models')(sequelize)
	const Employee = models.Employee

	router.get('/', async (req, res) => {
        let employees = await Employee.findAll({});
        res.json({status: 200, employees})
	})

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

	router.post('/create', async (req, res) => {
		// TO DO: check permission

		try {
			let data = req.body.data
			Object.keys(data).forEach(element => {
				if (data[element] === '') {
					data[element] = null
				}
			})
			await Employee.create(data)

			const mailOptions = {
				from: 'nurturebot.mailer@gmail.com',
				to: 'mdaniyal.kh@gmail.com',
				subject: 'Your Circle account is now active',
				text:
					'Your circle account username: ' +
					data.username +
					' is now active. Your password is: ' +
					data.password,
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
		const employeeDetails = Object.assign({}, req.body);
		const machineCode = req.body.machineCode;
		let allowed_keys = [
			'CNIC',
			'mobileNo',
			'email',
			'address',
			'permanentAddress',
			'emergencyNumber',
			'password',
			'profileImage',
			'maritalStatus'
		]
		for (key in employeeDetails) {
			if (!allowed_keys.includes(key)) {
				delete employeeDetails[key]
			}
		}
		const updateStatus = await Employee.update(employeeDetails, {
			where: {
				machineCode
			},
		})

		if (updateStatus) {
			const updatedEmployee = await Employee.findOne({where: {machineCode}})
			res.json({status: 200, employee: updatedEmployee})
		} else {
			res.json({status: 500, message: "Cannot update employee"})
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

	router.post('/shifts/create', async (req, res) => {
		console.log('Creating shift')
		let obj = req.body.data
		let shiftDetails = obj.shiftDetails
		delete obj['shiftDetails']
		await models.Shift.create(obj).then(createdShift => {
			console.log('=== SHIFT CREATED ===')
			shiftDetails.forEach(shift => {
				console.log('=== CREATING SHIFT FLAG ===')
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

	router.get("/defaultshifts/:machineCode/", async (req,res)=>{
		// TO DO: check admin or machineCode
		
		let defaultShifts = await models.DefaultShift.findAll({where: {machineCode: req.query.machineCode}, include: [models.Shift]}).catch(e=>{console.log(e); return res.sendStatus(400)});
		return res.json(defaultShifts);
		
	})

	router.delete("/defaultshifts", async (req,res)=>{
		// TO DO: check admin
		await models.DefaultShift.destroy({where: {defaultShift_id: req.body.data.defaultShift_id}});
		// TO DO: send mail
		res.sendStatus(200);
	})

	router.post("/defaultshifts", async (req,res)=> {
		// TO DO: check admin
		models.DefaultShift.create(req.body.data)
		// TO DO: send mail
		res.sendStatus(200);
	})

	// TO DO: handle attendance updates

	router.get("/scheduledShifts/:machineCode", async (req,res)=>{
		let from = moment(req.query.from).startOf("day");
		let to = moment(req.query.to).startOf("day");
		
		let shifts = await models.ScheduledShift.findAll({where: {machineCode:req.params.machineCode,
			date: {
				$between: [from.toDate(), to.toDate()]
			}}}).catch(e=>{console.log(e); return res.sendStatus(400)})
		return res.json(shifts);
	})


	return router
}
