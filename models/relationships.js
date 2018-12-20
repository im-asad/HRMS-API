module.exports = sequelize => {
	/*
		Run the associate function of all models to create relationships
	*/
	const models = require('./index.js')(sequelize)
	Object.keys(models).forEach(model => {
		if ('associate' in models[model]) {
			models[model].associate(models)
		}
	})

}
