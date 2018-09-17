const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require('config');

const dbConfig = config.get('dbConfig');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Sequelize = require('sequelize');
const sequelize = new Sequelize('hrms', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
});
// importing routes
const auth_routes = require("./routes/auth")(sequelize);

app.use(auth_routes);

const User = require("./models/user")(sequelize);
sequelize.sync();

// middleware for protected routes
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const token = bearerHeader.split(" ")[1];
        try {
            const decoded = jwt.verify(token, 'SKAD@!#KJASDN');
            next();
        } catch(err) {
            // err
            res.json({err: "Authentication failed!", status: 402})
        }
    } else {
        // response error with status 400;
        res.json({err: "Authentication failed!", status: 403})
    }
}

app.listen(2200, () => {
    console.log("API Server Running.")
});