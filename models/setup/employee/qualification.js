const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("qualification", {
        qualification_id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        qualification: {
            type: Sequelize.STRING
        }
    })
}