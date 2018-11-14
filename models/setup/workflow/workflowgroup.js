const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("workflowgroup", {
        workflowgroup_id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        workflowgroup: {
            type: Sequelize.STRING
        }

    })
}