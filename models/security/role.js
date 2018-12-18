const Sequelize = require('sequelize')

module.exports = sequelize => {
	const Role = sequelize.define('role', {
		role_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		roleName: {
			type: Sequelize.STRING,
		},
		permissions: {
			type: Sequelize.TEXT,
			defaultValue: JSON.stringify(permissions),
		},
	})
	return Role
}

const permissions = {
	employees: { canAccess: false },
	birthdays: { canAccess: false },
	home: {
		canAccess: true,
		profile: { canAccess: true },
		leave: { canAccess: true },
		attendance: { canAccess: false },
		myAttendance: { canAccess: true },
	},
	leave: {
		canAccess: false,
		leavePolicy: { canAccess: false },
		leaveRequest: { canAccess: false },
		leaveApproval: { canAccess: false },
	},
	setup: {
		canAccess: false,
		company: {
			canAccess: false,
			weeklyOffDays: { canAccess: false },
			shift: { canAccess: false },
			gazettedHolidays: { canAccess: false },
			attendanceFlag: { canAccess: false },
		},
		employee: {
			canAccess: false,
			country: { canAccess: false },
			branch: { canAccess: false },
			group: { canAccess: false },
			division: { canAccess: false },
			department: { canAccess: false },
			designation: { canAccess: false },
			employeeCategory: { canAccess: false },
			city: { canAccess: false },
			grade: { canAccess: false },
			function: { canAccess: false },
			subDepartment: { canAccess: false },
			managementLevel: { canAccess: false },
			subManagementLevel: { canAccess: false },
			qualification: { canAccess: false },
			qualificationLevel: { canAccess: false },
			leavingReason: { canAccess: false },
			subLeavingReason: { canAccess: false },
			employeeStatus: { canAccess: false },
			employeeProfile: { canAccess: false },
			employeeTransfer: { canAccess: false },
		},
		workflow: {
			canAccess: false,
			userGroup: { canAccess: false },
			workflowGroup: { canAccess: false },
			workflowUserGroup: { canAccess: false },
		},
	},
	attendance: {
		canAccess: true,
		viewAttendance: { canAccess: false },
		employeeShift: { canAccess: false },
		attendanceRequestApproval: { canAccess: false },
		attendanceRequest: { canAccess: true },
	},
	security: {
		canAccess: true,
		manageRights: { canAccess: false },
		manageRoles: { canAccess: false },
		userProfile: { canAccess: true },
	},
}
