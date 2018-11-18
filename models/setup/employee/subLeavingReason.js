const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const SubLeavingReason = sequelize.define("subLeavingReason", {
        subLeavingReason_id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        subLeavingReason: {
            type: Sequelize.STRING
        }
    })
    console.log("====== SUBLEAVINGREASON =====")
    SubLeavingReason.associate = function(models) {
        console.log("==== CREATING RELATIONSHIP ====");
        SubLeavingReason.belongsTo(models.LeavingReason, {foreignKey: 'leavingReason_id'});
    }
    return SubLeavingReason
}