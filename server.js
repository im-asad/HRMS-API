const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require('config');

const dbConfig = config.get('dbConfig');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('hrms', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// importing routes
const auth_routes = require("./routes/auth")(sequelize);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(auth_routes);

const User = require("./models/user")(sequelize);
sequelize.sync();

// middleware for protected routes

app.listen(2200, () => {
    console.log("API Server Running.")
});