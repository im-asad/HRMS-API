const jwt = require("jsonwebtoken");
const router = require("express").Router();
const config = require("config");
const bcrypt = require("bcrypt");
const auth_secret = config.get("AUTH_SECRET");
const middlewares = require("../middlewares/auth");

module.exports = (sequelize) => {
    const User = require("../models/user")(sequelize);
    router.get("/", middlewares.verifyToken, function (req, res) {
        res.send("API is up and running.")
    });

    router.post("/api/login", async (req, res) => {
        const { username, password } = req.body;
        const user = await User.findOne({where: {username}})

        // compare password
        if (!user) {
            res.json({status: 402, message: "User doesn't exist."})
        } else {
            const match = await bcrypt.compare(password, user.dataValues.password);
            if (match) {
                const token = jwt.sign({user}, auth_secret);
                res.json({status: 200, token})
            } else {
                res.json({status: 402, message: "Invalid credentials"});
            }
        }
    });

    router.post("/api/register", async (req, res) => {
        const { username, password, firstName, lastName } = req.body;
        const user = await User.findOne({where: {username}})

        if (user) {
            res.json({status: 402, message: "User already exist."})
        } else {
            const salt = bcrypt.genSaltSync(parseInt(config.get("SALT_ROUNDS")));
            const hash = bcrypt.hashSync(password, salt);
            const newUser = await User.create({
                username, password: hash, firstName, lastName
            })
            if (!newUser) res.json({status: 500, message: "Cannot create new user."});
            else res.json({status: 200, user: newUser});
        }
    })

    return router;
};