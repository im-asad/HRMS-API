module.exports = (sequelize) => {
    const models = require('./index.js')(sequelize);

    // models.LeavingReason.hasOne(models.SubLeavingReason, {foreignKey: 'leavingReason_id'});
    // console.log("ESTABLISHING RELATIONSHIPS");
    // models.SubLeavingReason.associate = function(models) {
    //     console.log("==== CREATING RELATIONSHIP ====");
    //     SubLeavingReason.belongsTo(models.LeavingReason, {foreignKey: 'leavingReason_id'});
    // }

    // models.Employee.belongsTo(models.Designation, {foreignKey: 'designation_id'} );
    // models.Employee.belongsTo(models.Branch, {foreignKey: 'branch_id'});
    // models.Employee.belongsTo(models.Department, {foreignKey: 'department_id'});
    // models.Employee.belongsTo(models.Group, {foreignKey: 'group_id'});
    // models.Employee.belongsTo(models.Branch, {foreignKey: 'branch_id'});
    // models.Employee.belongsTo(models.EmployeeCategory, {foreignKey: 'employeeCategory_id'});
    // models.Employee.belongsTo(models.City, {foreignKey: 'city_id'});
    // models.Employee.belongsTo(models.QualificationLevel, {foreignKey: 'qualificationLevel_id'});
    // models.Employee.belongsTo(models.Division, {foreignKey: 'divison_id'});
    // models.Employee.belongsTo(models.SubDepartment, {foreignKey: 'subDepartment_id'});
    // models.Employee.belongsTo(models.Qualification, {foreignKey: 'qualification_id'});
    // // models.Employee.belongsTo(models.Shift, {foreignKey: 'defaultShift_id'});
    // models.Employee.belongsTo(models.LeavingReason, {foreignKey: 'leavingReason_id'});
    // models.Employee.belongsTo(models.SubLeavingReason, {foreignKey: 'subLeavingReason_id'});
    // models.Employee.belongsTo(models.Employee, {foreignKey: 'approver_id'});
    return models;
}
