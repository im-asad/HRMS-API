const jwt = require("jsonwebtoken");
const router = require("express").Router();
const bcrypt = require("bcrypt-nodejs");
const middlewares = require("../middlewares/auth");

module.exports = (sequelize) => {
    const auth_secret = process.env.AUTH_SECRET;
    const User = require("../models/user")(sequelize);
    const Employee = require("../models/setup/employee/employee")(sequelize);
    router.post("/verify-token", middlewares.verifyToken, function (req, res) {
        res.json({message: "API is up and running.", status: 200, request_user: req.user})
    });

    router.post("/api/login", async (req, res) => {
        const { username, password } = req.body;
        const user = await Employee.findOne({where: {username}})

        // compare password
        if (!user) {
            res.json({status: 402, message: "User doesn't exist."})
        } else {
            const match = bcrypt.compareSync(password, user.dataValues.password);
            if (match) {
                const { username, password, employeeName, employeeType, machineCode } = user;
                const tokenUser = {
                    username, password, employeeName, employeeType, machineCode
                }
                const token = jwt.sign({tokenUser}, auth_secret);
                res.json({status: 200, token, request_user: tokenUser})
            } else {
                res.json({status: 402, message: "Invalid credentials."});
            }
        }
    });

    router.post("/api/register", async (req, res) => {
        const { username, password, employee_name , machineCode } = req.body;
        const user = await Employee.findOne({where: {username}})

        if (user) {
            res.json({status: 402, message: "User already exist."})
        } else {
            const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
            const hash = bcrypt.hashSync(password, salt);
            const newUser = await Employee.create({
                username,
                password: hash,
                employee_name,
                machineCode
            })
            if (!newUser) res.json({status: 500, message: "Cannot create new user. Internal server error."});
            else res.json({status: 200, user: newUser});
        }
    })

    return router;
};