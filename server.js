const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cloudinary = require('cloudinary')
const dotenv = require('dotenv')
const Sequelize = require('sequelize')

dotenv.config()

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'nurturebot.mailer@gmail.com',
		pass: 'nurturebot7412',
	},
})

const {
	DB_NAME,
	DB_USERNAME,
	DB_PASSWORD,
	DB_HOST,
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
} = process.env

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'mysql',
	operatorsAliases: false,
})

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
})

// importing routes
const auth_routes = require('./routes/auth')(sequelize)
const crud_routes = require('./routes/general/crud')(sequelize)
const employee_routes = require('./routes/employee')(sequelize, transporter)
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

app.use(bodyParser.json())
app.use(auth_routes)
app.use(crud_routes)
app.use('CRUD/employee', employee_routes)

require('./models/relationships.js')(sequelize)
sequelize.sync()

// middleware for protected routes
app.listen(2200, () => {
	console.log('API Server Running.')
})
