const Sequelize = require('sequelize')

module.exports = sequelize => {
	const Employee = sequelize.define('employee', {
		username: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
		employee_name: {
			type: Sequelize.STRING,
		},
		machineCode: {
			type: Sequelize.STRING,
			primaryKey: true,
		},
		employee_country: {
			type: Sequelize.STRING,
		},
		maritalStatus: {
			type: Sequelize.STRING,
		},
		gender: {
			type: Sequelize.STRING,
		},
		birthDate: {
			type: Sequelize.DATE,
		},
		CNIC: {
			type: Sequelize.STRING,
		},

		mobileNo: {
			type: Sequelize.STRING,
		},

		email: {
			type: Sequelize.STRING,
		},

		address: {
			type: Sequelize.STRING,
		},

		permanentAddress: {
			type: Sequelize.STRING,
		},

		appointmentDate: {
			type: Sequelize.STRING,
		},

		leavingDate: {
			type: Sequelize.STRING,
		},

		confirmationDate: {
			type: Sequelize.STRING,
		},

		joiningDate: {
			type: Sequelize.STRING,
		},
	})

	Employee.associate = function(models) {
		Employee.belongsTo(models.Designation, {
			foreignKey: 'designation_id',
		})
		Employee.belongsTo(models.Branch, {
			foreignKey: 'branch_id',
		})
		Employee.belongsTo(models.Department, {
			foreignKey: 'department_id',
		})
		Employee.belongsTo(models.EmployeeCategory, {
			foreignKey: 'employeeCategory_id',
		})
		Employee.belongsTo(models.City, {
			foreignKey: 'city_id',
		})
		Employee.belongsTo(models.QualificationLevel, {
			foreignKey: 'qualificationLevel_id',
		})
		Employee.belongsTo(models.Division, {
			foreignKey: 'division_id',
		})
		Employee.belongsTo(models.SubDepartment, {
			foreignKey: 'subDepartment_id',
		})
		Employee.belongsTo(models.Qualification, {
			foreignKey: 'qualification_id',
		})
		Employee.belongsTo(models.Shift, {
			foreignKey: 'defaultShift_id',
		})
		Employee.belongsTo(models.LeavingReason, {
			foreignKey: 'leavingReason_id',
		})
		Employee.belongsTo(models.SubLeavingReason, {
			foreignKey: 'subLeavingReason_id',
		})
		// Employee.belongsTo(models.Employee, {
		// 	foreignKey: 'approver_id',
		// })
	}

	return Employee
}
