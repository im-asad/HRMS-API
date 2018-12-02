module.exports = (sequelize) => {
    var setupModels = require('./setup/')(sequelize);
    var leaveModels = require('./leave/')(sequelize);
    var models = Object.assign({}, setupModels, leaveModels);

    console.log(models);

    return models;
};