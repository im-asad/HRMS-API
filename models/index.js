module.exports = (sequelize) => {
    var setupModels = require('./setup/')(sequelize);

    var models = Object.assign({}, setupModels);
    
    console.log(models);

    return models;
}




