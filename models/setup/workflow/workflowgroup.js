const Sequelize = require('sequelize')

module.exports = sequelize => {
	return sequelize.define('workflowgroup', {
		workflowGroup_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		workflowGroup: {
			type: Sequelize.STRING,
		},
	})
}
