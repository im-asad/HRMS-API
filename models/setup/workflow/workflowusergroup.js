const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("worflowusergroup", {
        workflowusergroup_id: {
            type:Sequelize.STRING,
            primaryKey:true,
            autoIncrement: true
        },
        workflowusergroup: {
            type: Sequelize.STRING
        }
    })
}