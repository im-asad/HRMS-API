module.exports = (sequelize) => {


    const leaveRequestModels = require('./leave-request/')(sequelize);


    const models = Object.assign({}, leaveRequestModels);
    return models;
};