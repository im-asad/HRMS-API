const Sequelize = require('sequelize')

module.exports = sequelize => {
	const Department = sequelize.define('department', {
		department_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		department: {
			type: Sequelize.STRING,
		},

		costCenterCode: {
			type: Sequelize.STRING,
		},

		glCode: {
			type: Sequelize.STRING,
		},

		department_prefix: {
			type: Sequelize.STRING,
		},
	})

	Department.associate = function(models) {
		Department.belongsTo(models.WorkflowGroup, {
			foreignKey: 'workflowgroup_id', onDelete: "CASCADE"
		})
	}
	return Department
}
