const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('grade', {
		grade_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		grade: {
			type: Sequelize.STRING,
		},

		grade_prefix: {
			type: Sequelize.STRING,
		},
	})
}
