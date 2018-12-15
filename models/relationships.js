module.exports = sequelize => {
	const models = require('./index.js')(sequelize)
	Object.keys(models).forEach(model => {
		if ('associate' in models[model]) {
			models[model].associate(models)
		}
	})
	models.WeeklyOffDays.destroy({ where: {} })
	models.WeeklyOffDays.create({
		weeklyOffDays: 1,
		sunday: false,
		monday: false,
		tuesday: false,
		wednesday: false,
		thursday: false,
		friday: false,
		saturday: false,
	})
}
