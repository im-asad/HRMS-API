const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('userGroup', {
		userGroup_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userGroup: {
			type: Sequelize.STRING,
		},
	})
}
