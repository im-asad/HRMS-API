const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const DefaultShift = sequelize.define("defaultShifts", {
        
        defaultShift_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })

    DefaultShift.associate = function(models){
        DefaultShift.belongsTo(models.Shift, {foreignKey: "shift_id", onDelete: "CASCADE"})
        DefaultShift.belongsTo(models.Employee, {foreignKey: "machineCode", onDelete: "CASCADE"})
    }
    return DefaultShift;
}