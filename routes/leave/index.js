const router = require('express').Router()
const moment = require('moment')
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (sequelize) => {
	const models = require('../../models')(sequelize); 
    

    router.post("/request", async (req,res)=>{
        // create attendance request
        let attendance = req.body.data;
        attendance.status = "pending";
        models.AttendanceRequest.create(attendance)
        .then(()=>{res.sendStatus(200)})
        .catch((e)=>{console.log(e); res.sendStatus(400)});
    })
	
    return router
}
