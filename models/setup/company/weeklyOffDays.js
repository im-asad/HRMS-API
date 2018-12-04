const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('weeklyOffDays', {
		weeklyOffDays: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		sunday: {
			type: Sequelize.BOOLEAN,
		},
		monday: {
			type: Sequelize.BOOLEAN,
		},
		tuesday: {
			type: Sequelize.BOOLEAN,
		},
		wednesday: {
			type: Sequelize.BOOLEAN,
		},
		thursday: {
			type: Sequelize.BOOLEAN,
		},
		friday: {
			type: Sequelize.BOOLEAN,
		},
		saturday: {
			type: Sequelize.BOOLEAN,
		},
	})
}
