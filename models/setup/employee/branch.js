const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('branch', {
		branch_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},

		branch: {
			type: Sequelize.STRING,
		},

		branch_prefix: {
			type: Sequelize.STRING,
		},
	})
}
