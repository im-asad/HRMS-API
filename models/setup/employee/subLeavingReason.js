const Sequelize = require('sequelize')

module.exports = sequelize => {
	const SubLeavingReason = sequelize.define('subLeavingReason', {
		subLeavingReason_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		subLeavingReason: {
			type: Sequelize.STRING,
		},
	})
	SubLeavingReason.associate = function(models) {
		SubLeavingReason.belongsTo(models.LeavingReason, { foreignKey: 'leavingReason_id' })
	}
	return SubLeavingReason
}
