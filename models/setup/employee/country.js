const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('country', {
		country_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		country: {
			type: Sequelize.STRING,
		},
	})
}
