const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('weeklyOffDays', {
		day: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		off: {
			type: Sequelize.BOOLEAN,
		},
	})
}
