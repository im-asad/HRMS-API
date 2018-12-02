const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('subDepartment', {
		subDepartment_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		subDepartment: {
			type: Sequelize.STRING,
		},

		subDepartment_prefix: {
			type: Sequelize.STRING,
		},
	})
}
