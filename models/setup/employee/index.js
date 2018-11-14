module.exports = (sequelize) => ({
    Branch: require("./branch.js")(sequelize),
    City: require("./city.js")(sequelize),
    Country: require("./country.js")(sequelize),
    Department: require("./department.js")(sequelize),
    Designation: require("./designation.js")(sequelize),
    Division: require("./division.js")(sequelize),
    EmployeeCategory: require("./employeeCategory.js")(sequelize),
    Grade: require("./grade.js")(sequelize),
    Group: require("./group.js")(sequelize),
    LeavingReason: require("./leavingReason.js")(sequelize),
    Qualification: require("./qualification.js")(sequelize),
    QualificationLevel: require("./qualificationLevel.js")(sequelize),
    Status: require("./status.js")(sequelize),
    SubDepartment: require("./subDepartment.js")(sequelize),
    SubLeavingReason: require("./subLeavingReason.js")(sequelize),
    Employee: require("./employee.js")(sequelize)
});