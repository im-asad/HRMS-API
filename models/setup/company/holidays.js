const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('holiday', {
		holiday: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		holidayDate: {
			type: Sequelize.STRING,
		},

		holidayRemarks: {
			type: Sequelize.STRING,
		},
	})
}
