const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('employeeCategory', {
		employeeCategory_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		employeeCategory: {
			type: Sequelize.STRING,
		},
	})
}
