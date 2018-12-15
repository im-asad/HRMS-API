const router = require('express').Router()
const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = (sequelize, transporter) => {
    const models = require('../../models')(sequelize)

    router.post('/request', async (req, res) => {
        console.log("=== LEAVE REQUEST ROUTE ===");
        console.log(models.LeaveRequest);
        // create attendance request
        let leave = req.body.data
        let machineCode = "AD-124" // TO DO: get machine code from request header
        leave.requester_id = machineCode;
        // to do: add requester id
        let employee = await models.Employee.findOne({
            where: {
                machineCode: machineCode,
            },
        }).catch(e => console.log)
        if (employee.leaveBalance < 1) {
            return res.sendStatus(429)
        }
        await employee.update({
            leaveBalance: parseInt(employee.leaveBalance) - 1
        });

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

        // params: status leaveRequest_id,

        let request = await models.LeaveRequest.findOne({
            where: {
                leaveRequest_id: req.body.data.leaveRequest_id,
            },
        })

        let approver_id = "AD-123"; // TO DO: get approver id from header

        if (!request) {
            return res.sendStatus(400)
        }

        let machineCode = request.requester_id

        let employee = await models.Employee.findOne({
            where: {
                machineCode: machineCode,
            },
        })

        if (req.body.data.status === 'declined') {
            await request.update({
                status: req.body.data.status,
                approver_id: approver_id
            })
            // TO DO: send mail to employee


            await employee.update({
                leaveBalance: parseInt(employee.leaveBalance) + 1,
            })
            console.log(employee.email);
            let decline_html = "<p>Hello ${name}</p> <p>Your leave request with id ${id} for the date ${date} was declined.</p>";
            let formatted_html = decline_html.replace("${name}", employee.dataValues.employeeName).replace("${id}", request.leaveRequest_id).replace("${date}", request.leaveDate);
            const mailOptions = {
                from: 'Circle Bot <mailer.circle@gmail.com>',
                to: employee.email,
                subject: 'Your leave request was declined.',
                html: formatted_html
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })

            return res.sendStatus(200)
        } else if (req.body.data.status === 'accepted') {
            // TO DO: set approver id
            await request.update({
                status: req.body.data.status,
                approver_id: approver_id
            })

            // find attendances of that employee on that day
            // mark their status as Leave

            await models.Attendance.update({
                status: 'L',
            }, {
                where: {
                    attendance_id: request.attendance_id
                },
            })
        }

        let accept_html = "<p>Hello ${name}</p> <p>Your leave request with id ${id} for the date ${date} was accepted!</p>";
        let formatted_html = accept_html.replace("${name}", employee.dataValues.employeeName).replace("${id}", request.leaveRequest_id).replace("${date}", request.leaveDate);
        const mailOptions = {
            from: 'Circle Bot <mailer.circle@gmail.com>',
            to: employee.email,
            subject: 'Your leave request has been accepted.',
            html: formatted_html
        }

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })

        return res.sendStatus(200)
    })

    router.get("/request", async (req, res) => {

        // TO DO: get requester machine code from header
        let machineCode = "AD-124";

        let requests = await models.LeaveRequest.findOne({
            where: {
                requester_id: machineCode
            }
        });
        return res.json(requests);
    })

    router.get("/request/all", (req, res) => {

        // TO DO: admin middleware

        let requests = await models.LeaveRequest.findAll({});

        return res.json(requests);
    })

    return router
}