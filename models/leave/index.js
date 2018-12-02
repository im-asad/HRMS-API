module.exports = (sequelize) => {

    const leaveAdminModels = require('./leave-admin/')(sequelize);
    const leaveCalendarModels = require('./leave-calendar/')(sequelize);
    const leaveRequestModels = require('./leave-request/')(sequelize);
    const leavePlanRequestModels = require('./leave-plan-request/')(sequelize);
    const leaveSetupModels = require('./leave-setup/')(sequelize);


    const models = Object.assign({}, leaveAdminModels, leaveCalendarModels, leavePlanRequestModels, leaveRequestModels, leaveSetupModels);
    return models;
};