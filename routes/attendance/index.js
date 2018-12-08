const router = require('express').Router()
const moment = require('moment')

module.exports = (sequelize, transporter) => {
	const models = require('../../models')(sequelize);


    router.get("/employee/:machineCode", async (req,res)=>{
        // return this employee's attendance

        let from = moment(req.query.from).startOf("day");
        let to = moment(req.query.to).startOf("day");

        let attendance = await models.Attendance.findAll({where: {machineCode: req.params.machineCode,
            inDate: {
                $between: [from.toDate(), to.toDate()]
            }
        }, include:[models.Shift]}).catch(console.log);

        return res.json(attendance);

    });

    router.post("/request", async (req,res)=>{
        // create attendance request
        let attendance = req.body.data;
        attendance.status = "pending";
        models.AttendanceRequest.create(attendance)
        .then(()=>{res.sendStatus(200)})
        .catch((e)=>{console.log(e); res.sendStatus(400)});
    })

    router.get("/attendanceRequest", async (req,res)=> {
        // TO DO: admin middleware
        let status = req.query.status;
        let from = moment(req.query.from).startOf("day");
        let to = moment(req.query.to).startOf("day");

        let requests = await models.AttendanceRequest.findAll({where: {status:status,
        createdAt: {
            $between: [from.toDate(), to.toDate()]
        }}}).catch(e=>{console.log(e); return res.sendStatus(400)})

        return res.json(requests);
    })

    router.put("/attendanceRequest", async(req,res)=>{
        // TO DO: admin middleware
        models.AttendanceRequest.update({status: req.body.status},
            {where: {attendanceRequest_id: req.body.attendanceRequest_id}});
    })

    



	
	return router
}
