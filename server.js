const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
const Sequelize = require('sequelize');


dotenv.config();

const {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// importing routes
const auth_routes = require("./routes/auth")(sequelize);
const crud_routes = require("./routes/general/crud")(sequelize);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(auth_routes);
app.use(crud_routes);

require("./models/relationships.js")(sequelize)
sequelize.sync();






// middleware for protected routes

app.listen(2200, () => {
    console.log("API Server Running.")
});