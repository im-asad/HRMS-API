module.exports = (sequelize) => ({
    UserGroup: require('./usergroup.js'),
    WorkflowGroup: require('./workflowgroup.js'),
    WorkflowUserGroup: require('./workflowusergroup.js')
});