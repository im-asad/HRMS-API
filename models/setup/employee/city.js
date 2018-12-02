const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('city', {
		city_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		city: {
			type: Sequelize.STRING,
		},
	})
}
