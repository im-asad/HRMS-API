const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("leavingReason", {
        leavingReason_id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        leavingReason: {
            type: Sequelize.STRING
        }
    })
}