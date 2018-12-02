const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('division', {
		division_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		division: {
			type: Sequelize.STRING,
		},
	})
}
