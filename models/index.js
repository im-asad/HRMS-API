// combine all models into a single object
module.exports = sequelize => {
	var setupModels = require('./setup/')(sequelize);
	var leaveModels = require('./leave/')(sequelize);
	var attendanceModels = require('./attendance/')(sequelize)
	var securityModels = require('./security/')(sequelize)
	var models = Object.assign({}, setupModels, leaveModels, attendanceModels, securityModels)

	return models
}