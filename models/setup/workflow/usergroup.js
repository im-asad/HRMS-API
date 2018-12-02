const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('usergroup', {
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
