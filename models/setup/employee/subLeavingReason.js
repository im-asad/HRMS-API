const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("subLeavingReason", {
        subLeavingReason_id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        subLeavingReason: {
            type: Sequelize.STRING
        }
    })
}