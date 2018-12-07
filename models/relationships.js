module.exports = (sequelize) => {
    const models = require('./index.js')(sequelize);
    console.log("=== CREATING RELATIONSHIPS ===");
    Object.keys(models).forEach((model) => {
        console.log("model:", model)
        if ('associate' in models[model]) {
            models[model].associate(models);
        }
    });
}