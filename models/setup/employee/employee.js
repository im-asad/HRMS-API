const Sequelize = require('sequelize')

module.exports = sequelize => {
	const Employee = sequelize.define('employee', {
		username: {
			type: Sequelize.STRING,
		},
		password: {
			type: Sequelize.STRING,
		},
		leaveBalance: {
			type: Sequelize.STRING,
		},
		employeeName: {
			type: Sequelize.STRING,
		},
		employeeType: {
			type: Sequelize.STRING,
		},
		machineCode: {
			type: Sequelize.STRING,
			primaryKey: true,
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
		profileImage: {
			type: Sequelize.STRING,
		},
	})

	Employee.associate = function (models) {
		Employee.belongsTo(models.Designation, {
			foreignKey: 'designation_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.Branch, {
			foreignKey: 'branch_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.Department, {
			foreignKey: 'department_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.EmployeeCategory, {
			foreignKey: 'employeeCategory_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.City, {
			foreignKey: 'city_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.Country, {
			foreignKey: 'country_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.QualificationLevel, {
			foreignKey: 'qualificationLevel_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.Division, {
			foreignKey: 'division_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.SubDepartment, {
			foreignKey: 'subDepartment_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.Qualification, {
			foreignKey: 'qualification_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.Shift, {
			foreignKey: 'shift_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.LeavingReason, {
			foreignKey: 'leavingReason_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.SubLeavingReason, {
			foreignKey: 'subLeavingReason_id',
			onDelete: 'CASCADE',
		})
		Employee.belongsTo(models.Employee, {
			foreignKey: 'approver_id',
			onDelete: 'CASCADE',
			as: 'approver',
		})
	}

	return Employee
}