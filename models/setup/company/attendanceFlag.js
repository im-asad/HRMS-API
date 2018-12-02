const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('attendanceFlag', {
		attendanceFlag_id: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		attendanceFlag: {
			type: Sequelize.STRING,
		},

		attendanceFlagCategory: {
			type: Sequelize.STRING,
		},

		effectBy: {
			type: Sequelize.STRING,
		},

		attendanceFlagType: {
			type: Sequelize.STRING,
		},

		attendanceFlagValue: {
			type: Sequelize.FLOAT,
		},
	})
}
