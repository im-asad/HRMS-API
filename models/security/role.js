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
	employees: { canAccess: true },
	birthdays: { canAccess: true },
	home: {
		canAccess: true,
		profile: { canAccess: true },
		leave: { canAccess: true },
		attendance: { canAccess: true },
	},
	leave: {
		canAccess: true,
		leavePolicy: { canAccess: true },
		leaveRequest: { canAccess: true },
		leaveApproval: { canAccess: true },
	},
	setup: {
		canAccess: true,
		company: {
			canAccess: true,
			weeklyOffDays: { canAccess: true },
			shift: { canAccess: true },
			gazettedHolidays: { canAccess: true },
			attendanceFlag: { canAccess: true },
		},
		employee: {
			canAccess: true,
			country: { canAccess: true },
			branch: { canAccess: true },
			group: { canAccess: true },
			division: { canAccess: true },
			department: { canAccess: true },
			designation: { canAccess: true },
			employeeCategory: { canAccess: true },
			city: { canAccess: true },
			grade: { canAccess: true },
			function: { canAccess: true },
			subDepartment: { canAccess: true },
			managementLevel: { canAccess: true },
			subManagementLevel: { canAccess: true },
			qualification: { canAccess: true },
			qualificationLevel: { canAccess: true },
			leavingReason: { canAccess: true },
			subLeavingReason: { canAccess: true },
			employeeStatus: { canAccess: true },
			employeeProfile: { canAccess: true },
			employeeTransfer: { canAccess: true },
		},
		workflow: {
			canAccess: true,
			userGroup: { canAccess: true },
			workflowGroup: { canAccess: true },
			workflowUserGroup: { canAccess: true },
		},
	},
	attendance: {
		canAccess: true,
		viewAttendance: { canAccess: true },
		employeeShift: { canAccess: true },
		attendanceRequestApproval: { canAccess: true },
		attendanceRequest: { canAccess: true },
	},
	security: {
		canAccess: true,
		manageRights: { canAccess: true },
		manageRoles: { canAccess: true },
		userProfile: { canAccess: true },
	},
}
