const Sequelize = require('sequelize')

module.exports = sequelize => {
	const Permission = sequelize.define('permission', {
		permission_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		permissions: {
			type: Sequelize.TEXT,
		},
	})

	Permission.associate = models => {
		Permission.belongsTo(models.Role, { foreignKey: 'roleId', sourceKey: 'role_id' })
	}

	return Permission
}
