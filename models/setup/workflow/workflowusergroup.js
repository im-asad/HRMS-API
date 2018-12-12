const Sequelize = require('sequelize')

module.exports = sequelize => {
	const WorkflowUserGroup = sequelize.define('worflowusergroup', {
		workflowUserGroup_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		}
	})

	WorkflowUserGroup.associate = function(models){
		WorkflowUserGroup.belongsTo(models.UserGroup, { foreignKey: "userGroup_id", onDelete: "CASCADE" });
		WorkflowUserGroup.belongsTo(models.WorkflowGroup, {foreignKey: "workflowGroup_id", onDelete: "CASCADE" })
	}
	return WorkflowUserGroup;
}
