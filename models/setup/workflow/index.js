module.exports = (sequelize) => ({
    UserGroup: sequelize.import('./usergroup.js'),
    WorkflowGroup: sequelize.import('./workflowgroup.js'),
    WorkflowUserGroup: sequelize.import('./workflowusergroup.js')
});