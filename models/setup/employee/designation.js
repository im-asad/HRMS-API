const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('designation', {
		designation_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		designation: {
			type: Sequelize.STRING,
		},
		designation_prefix: {
			type: Sequelize.STRING,
		},
	})
}
