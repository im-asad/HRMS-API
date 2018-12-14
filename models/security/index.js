module.exports = sequelize => ({
    Role: sequelize.import('./role.js'),
    Permission: sequelize.import('./permission.js'),
});