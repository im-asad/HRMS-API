module.exports = (sequelize) => {
    const models = require('./index.js')(sequelize);
    console.log("=== CREATING RELATIONSHIPS ===");
    Object.keys(models).forEach((model) => {
        console.log("model:", model)
        if ('associate' in models[model]) {
            models[model].associate(models);
        }
    });
    models.WeeklyOffDays.destroy({where: {}});
    models.WeeklyOffDays.create({
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    })
}