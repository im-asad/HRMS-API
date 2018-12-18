const router = require('express').Router();
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;




module.exports = (sequelize, transporter) => {
    const models = require('../../models')(sequelize);
    const middleware = require('../../middlewares/auth');

    function upsert_policy(values, condition) {
        return models.LeavePolicy
            .findOne({
                where: condition
            })
            .then(function (obj) {
                if (obj) { // update
                    console.log("object exists. updating");
                    return obj.update(values).catch(e => console.log);
                } else { // insert
                    return models.LeavePolicy.create(values);
                }
            });
    }


    router.post('/request', middleware.verifyToken, async (req, res) => {
        console.log("=== LEAVE REQUEST ROUTE ===");
        console.log(models.LeaveRequest);
        // create attendance request
        let leave = req.body.data
        let machineCode = req.user.machineCode;
        leave.requester_id = machineCode;
        
        let employee = await models.Employee.findOne({
            where: {
                machineCode: machineCode,
            },
        }).catch(e => console.log)
        if (employee.leaveBalance < 1) {
            return res.sendStatus(429)
        }
        await employee.update({
            leaveBalance: parseFloat(employee.leaveBalance) - 1
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

    router.put('/request', middleware.verifyToken, async (req, res) => {
        // TO DO: admin middleware

        // params: status leaveRequest_id,

        let request = await models.LeaveRequest.findOne({
            where: {
                leaveRequest_id: req.body.data.leaveRequest_id,
            },
        })

        let approver_id = req.user.machineCode; // TO DO: get approver id from header

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


            await employee.update({
                leaveBalance: parseFloat(employee.leaveBalance) + 1,
            })
            console.log(employee.email);
            let decline_html = "<p>Hello ${name}</p> <p>Your leave request with id ${id} was declined.</p>";
            let formatted_html = decline_html.replace("${name}", employee.dataValues.employeeName).replace("${id}", request.leaveRequest_id);
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

        let accept_html = "<p>Hello ${name}</p> <p>Your leave request with id ${id} was accepted!</p>";
        let formatted_html = accept_html.replace("${name}", employee.dataValues.employeeName).replace("${id}", request.leaveRequest_id);
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

    router.get("/request", middleware.verifyToken,  async (req, res) => {

        // TO DO: get requester machine code from header
        let machineCode = req.user.machineCode;

        let requests = await models.LeaveRequest.findAll({
            where: {
                requester_id: machineCode
            },
            include: [{
                    model: models.Employee,
                    as: "approver"
                },
                {
                    model: models.Attendance,
                    include: [models.Shift]
                }
            ]
        });
        return res.json(requests);
    })

    router.get("/request/all", middleware.verifyToken,  async (req, res) => {

        // TO DO: admin middleware

        let requests = await models.LeaveRequest.findAll({
            include: [{
                    model: models.Employee,
                    as: "requester"
                },
                {
                    model: models.Attendance,
                    include: [models.Shift]
                }
            ]
        });

        return res.json(requests);
    });

    router.post("/policy", middleware.verifyToken, async (req, res) => {
        upsert_policy(req.body.data, {
            id: 1
        });
        return res.sendStatus(200);
    })

    router.get("/policy", async (req, res) => {
        let policy = await models.LeavePolicy.findOne({
            where: {
                id: 1
            }
        });
        return res.json(policy);
    })


    return router
}