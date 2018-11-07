module.exports = (sequelize) => {

    var employeeModels = require('./employee/')(sequelize);

    var models = Object.assign({}, employeeModels);
    return models;
}

