module.exports = (sequelize) => ({
    Branch: sequelize.import("./branch.js"),
    City: sequelize.import("./city.js"),
    Country: sequelize.import("./country.js"),
    Department: sequelize.import("./department.js"),
    Designation: sequelize.import("./designation.js"),
    Division: sequelize.import("./division.js"),
    EmployeeCategory: sequelize.import("./employeeCategory.js"),
    Grade: sequelize.import("./grade.js"),
    Group: sequelize.import("./group.js"),
    LeavingReason: sequelize.import("./leavingReason.js"),
    Qualification: sequelize.import("./qualification.js"),
    QualificationLevel: sequelize.import("./qualificationLevel.js"),
    Status: sequelize.import("./status.js"),
    SubDepartment: sequelize.import("./subDepartment.js"),
    SubLeavingReason: sequelize.import("./subLeavingReason.js"),
    Employee: sequelize.import("./employee.js")
});