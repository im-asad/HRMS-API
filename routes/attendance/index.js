const router = require('express').Router()
const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = (sequelize, transporter) => {
    const models = require('../../models')(sequelize)

    router.get('/employee/:machineCode', async (req, res) => {
        // return this employee's attendance


        // check if requester is admin or is requesting their own machine code

        // if (!(req.user.userType === "admin")) {
        //     if (!(req.user.machineCode === req.params.machineCode)) {
        //         return res.sendStatus(401);
        //     }
        // }

        let from = moment(req.query.from).startOf('day')
        let to = moment(req.query.to).startOf('day')

        let attendance = await models.Attendance.findAll({
            where: {
                machineCode: req.params.machineCode,
                inDate: {
                    [Op.between]: [from.toDate(), to.toDate()],
                },
            },
            include: [models.Shift],
        }).catch(console.log)

        return res.json(attendance)
    })

    router.post('/request', async (req, res) => {
        // create attendance request


        let attendance = req.body.data
        attendance.status = 'pending'
        // attendance.requester_id = req.user.machineCode
        attendance.requester_id = "AD-123";
        models.AttendanceRequest.create(attendance)
            .then(() => {
                res.sendStatus(200)
            })
            .catch(e => {
                console.log(e)
                res.sendStatus(400)
            })
    })

    router.get('/request/all', async (req, res) => {
        // TO DO: admin middleware

        // if (!(req.user.userType === "admin")) {
        //     return res.sendStatus(401);
        // }
        let from = moment(req.query.from)
            .startOf('day')
            .format('YYYY-MM-DD HH:mm')
        let to = moment(req.query.to)
            .endOf('day')
            .format('YYYY-MM-DD HH:mm')

        let requests = await models.AttendanceRequest.findAll({
            where: {
                createdAt: {
                    [Op.between]: [from, to]
                }
            },
            include: [{
                model: models.Attendance,
                include: [models.Shift]
            }, {
                model: models.Employee,
                as: "requester",
                include: [models.Department, models.Designation]
            }]
        }).catch(e => {
            console.log(e);
            return res.sendStatus(400)
        })

        // let requests = await sequelize.query(
        //     `SELECT * FROM attendanceRequests
        //  INNER JOIN attendances ON attendanceRequests.attendance_id=attendances.attendance_id
        //  WHERE attendanceRequests.createdAt BETWEEN "${from}" AND "${to}" `, {
        //         type: sequelize.QueryTypes.SELECT
        //     }
        // )

        return res.json(requests)
    })

    router.get("/request", async (req, res) => {

        // let machineCode = req.user.machineCode
        machineCode = "AD-123";

        let requests = await models.AttendanceRequest.findAll({
            where: {
                requester_id: machineCode
            },
            include: [{
                    model: models.Employee,
                    as: "approver",
                },
                {
                    model: models.Attendance
                }
            ]
        })

        return res.json(requests);
    })

    router.put('/request', async (req, res) => {
        // TO DO: admin middleware

        // let approver_id = req.user.machineCode
        let approver_id = "AD-123";

        let request = await models.AttendanceRequest.findOne({
            where: {
                attendanceRequest_id: req.body.data.attendanceRequest_id
            }
        })

        let employee = await models.Employee.findOne({
            where: {
                machineCode: request.requester_id
            }
        });

        if (req.body.data.status === "accepted") {
            await models.Attendance.update({
                actualInTime: request.inTime,
                actualOutTime: request.outTime,
                actualInDate: request.inDate,
                actualOutDate: request.outDate,
            }, {
                where: {
                    attendance_id: request.attendance_id
                }
            })

            // TO DO: Send mail
            let accept_html = "<p>Hello ${name}</p><p>Your attendance request with id ${id} has been accepted!</p>";
            let formatted_html = accept_html.replace("${name}", employee.dataValues.employeeName).replace("${id}", request.attendance_id);
            const mailOptions = {
                from: 'Circle Bot <mailer.circle@gmail.com>',
                to: employee.email,
                subject: 'Your attendance request has been accepted.',
                html: formatted_html
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })
        }

        if (req.body.data.status === "declined") {
            // TO DO: Send mail
            let decline_html = "<p>Hello ${name}</p><p>Your attendance request with id ${id} has been declined!</p>";
            let formatted_html = decline_html.replace("${name}", employee.dataValues.employeeName).replace("${id}", request.attendance_id);
            const mailOptions = {
                from: 'Circle Bot <mailer.circle@gmail.com>',
                to: employee.email,
                subject: 'Your attendance request has been declined.',
                html: formatted_html
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })
        }

        await models.AttendanceRequest.update({
            status: req.body.data.status,
            approver_id: approver_id
        }, {
            where: {
                attendanceRequest_id: req.body.data.attendanceRequest_id
            }
        })


        res.sendStatus(200)
    })

    return router
}