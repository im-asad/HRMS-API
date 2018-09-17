const router = require("express").Router();
module.exports = (sequelize) => {
    const User = require("../models/user")(sequelize);
    router.get("/", function (req, res) {
        User.findAll({
            where: {
                id: 2
            }
        })
            .then(data => {
                console.log(data)
            })
    });

    router.post("/api/login", (req, res) => {
        const user = {
            username: req.body.username,
            password: req.body.password
        }
        const token = jwt.sign({user}, "SKAD@!#KJASDN");
        res.json({status: 200, token})
    })

    return router;
};