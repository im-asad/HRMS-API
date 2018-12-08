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
        }}, include: [models.Attendance]}).catch(e=>{console.log(e); return res.sendStatus(400)})

        return res.json(requests);
    })

    router.put("/attendanceRequest", async(req,res)=>{
        // TO DO: admin middleware
        
        
        await models.Attendance.update({actualInTime: req.body.data.inTime,actualOutTime: req.body.data.outTime, actualInDate: req.body.data.inDate, actualOutDate: req.body.data.outDate},
            {where:{attendance_id: req.body.data.attendance_id}})
    
        await models.AttendanceRequest.update({status: req.body.data.status},
            {where: {attendanceRequest_id: req.body.data.attendanceRequest_id}});

        res.sendStatus(200);
    })

    



	
	return router
}
