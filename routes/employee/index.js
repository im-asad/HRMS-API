const router = require("express").Router();
const moment = require("moment");

module.exports = (sequelize) => {

    const Employee = require("../../models").Employee;


    router.get("/birthdays", async (req, res) => {
        let employees = await Employee.findAll({
            where: {
                $or: [{
                        birthDate: {
                            $lt: moment().add(3, "months").calendar()
                        }
                    },
                    {
                        birthDate: {
                            $gt: moment().subtract(3, "months").calendar()
                        }
                    }
                ]
            },
            attributes: ["employee_name", "birthDate"]
        })

        return employees.map(r => {
            return r.dataValues
        });
    })

    router.post("/", async (req, res) => {
        // TO DO: check permission

        try {
            await Employee.create(req.body);
            return res.sendStatus(200);
        } catch (e) {
            console.log("ERROR CREATING EMPLOYEE:", e);
            return res.sendStatus(400);
        }
    })

    router.put("/", async (req, res) => {
        let obj = req.body;

    })
    return router;
}