const Sequelize = require('sequelize')

module.exports = sequelize => {
	const Shift = sequelize.define('shift', {
		shift_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		shiftTitle: {
			type: Sequelize.STRING,
		},

		shiftCode: {
			type: Sequelize.STRING,
		},

		shiftStartingTime: {
			type: Sequelize.STRING,
		},

		shiftEndingTime: {
			type: Sequelize.STRING,
		},

		shiftGraceTime: {
			type: Sequelize.INTEGER,
		},
	})


	return Shift
}