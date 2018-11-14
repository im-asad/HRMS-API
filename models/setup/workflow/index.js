module.exports = (sequelize) => ({
    UserGroup: require('./usergroup.js')(sequelize),
    WorkflowGroup: require('./workflowgroup.js')(sequelize),
    WorkflowUserGroup: require('./workflowusergroup.js')(sequelize)
});