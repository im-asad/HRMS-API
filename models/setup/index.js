module.exports = (sequelize) => {

    const employeeModels = require('./employee/')(sequelize);
    const companyModels = require('./company/')(sequelize);
    const workflowModels = require('./workflow/')(sequelize);

    const models = Object.assign({}, employeeModels, companyModels, workflowModels);
    return models;
}