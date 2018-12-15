const bcrypt = require('bcrypt-nodejs')
const adminPrevileges = require('./permissions/admin')
const supervisorPrevileges = require('./permissions/supervisor')
const developerPrevileges = require('./permissions/developer')
module.exports = async db => {
	const {
		Branch,
		City,
		Country,
		Department,
		Designation,
		Division,
		Employee,
		EmployeeCategory,
		Grade,
		WorkflowGroup,
		LeavingReason,
		Qualification,
		QualificationLevel,
		SubDepartment,
		SubLeavingReason,
		AttendanceFlag,
		Holiday,
		WeeklyOffDays,
		Shift,
		UserGroup,
		WorkflowUserGroup,
		ShiftFlag,
		EmployeeLeaveOpening,
		LeavePolicy,
		LeavePolicyEmployeeWise,
		LeaveYearSetup,
		YearEnd,
		LeavePlanRequest,
		LeaveRequest,
		LeaveSetup,
		Attendance,
		AttendanceRequest,
		AttendanceRule,
		DefaultShift,
		ScheduledShift,
		Role,
		Permission,
	} = db

	await Role.bulkCreate([{
		roleName: 'supervisor'
	}, {
		roleName: 'admin'
	}, {
		roleName: 'developer'
	}])

	await WeeklyOffDays.bulkCreate([{
		weeklyOffDays: 1,
		sunday: true,
		monday: false,
		tuesday: false,
		wednesday: false,
		thursday: false,
		friday: false,
		saturday: true,
	}, ])

	await Branch.bulkCreate([{
			branch: 'Branch-1',
			branch_prefix: 'B1'
		},
		{
			branch: 'Branch-2',
			branch_prefix: 'B2'
		},
		{
			branch: 'Branch-3',
			branch_prefix: 'B3'
		},
		{
			branch: 'Branch-4',
			branch_prefix: 'B4'
		},
	])

	await City.bulkCreate([{
			city: 'Islamabad'
		},
		{
			city: 'Karachi'
		},
		{
			city: 'Quetta'
		},
		{
			city: 'Lahore'
		},
	])

	await LeavingReason.bulkCreate([{
			leavingReason: 'Reason-1'
		},
		{
			leavingReason: 'Reason-2'
		},
		{
			leavingReason: 'Reason-3'
		},
	])

	await Qualification.bulkCreate([{
			qualification: 'Qualification-1'
		},
		{
			qualification: 'Qualification-2'
		},
		{
			qualification: 'Qualification-3'
		},
	])

	await QualificationLevel.bulkCreate([{
			qualificationLevel: 1,
			qualificationLevelTitle: 'Title-1'
		},
		{
			qualificationLevel: 2,
			qualificationLevelTitle: 'Title-2'
		},
		{
			qualificationLevel: 1,
			qualificationLevelTitle: 'Title-3'
		},
	])

	await WorkflowGroup.bulkCreate([{
			workflowGroup: 'Workflow-Group-1'
		},
		{
			workflowGroup: 'Workflow-Group-2'
		},
		{
			workflowGroup: 'Workflow-Group-3'
		},
		{
			workflowGroup: 'Workflow-Group-4'
		},
	])

	await SubLeavingReason.bulkCreate([{
			subLeavingReason: 'Sub-Leaving Reason-1',
			leavingReason_id: 1
		},
		{
			subLeavingReason: 'Sub-Leaving Reason-1',
			leavingReason_id: 2
		},
		{
			subLeavingReason: 'Sub-Leaving Reason-1',
			leavingReason_id: 3
		},
		{
			subLeavingReason: 'Sub-Leaving Reason-1',
			leavingReason_id: 3
		},
	])

	await SubDepartment.bulkCreate([{
			subDepartment: 'Sub-Department-1',
			subDepartment_prefix: 'SD-1'
		},
		{
			subDepartment: 'Sub-Department-2',
			subDepartment_prefix: 'SD-2'
		},
		{
			subDepartment: 'Sub-Department-3',
			subDepartment_prefix: 'SD-3'
		},
	])

	await EmployeeCategory.bulkCreate([{
			employeeCategory: 'Category-1'
		},
		{
			employeeCategory: 'Category-2'
		},
		{
			employeeCategory: 'Category-3'
		},
		{
			employeeCategory: 'Category-4'
		},
	])

	await Grade.bulkCreate([{
			grade: 'Grade-1',
			grade_prefix: 'G1'
		},
		{
			grade: 'Grade-2',
			grade_prefix: 'G2'
		},
		{
			grade: 'Grade-3',
			grade_prefix: 'G3'
		},
		{
			grade: 'Grade-4',
			grade_prefix: 'G4'
		},
	])

	await Country.bulkCreate([{
			country: 'Japan'
		},
		{
			country: 'USA'
		},
		{
			country: 'India'
		},
		{
			country: 'Pakistan'
		},
	])

	await Designation.bulkCreate([{
			designation: 'Designation-1',
			designation_prefix: 'Desig-1'
		},
		{
			designation: 'Designation-2',
			designation_prefix: 'Desig-2'
		},
		{
			designation: 'Designation-3',
			designation_prefix: 'Desig-3'
		},
		{
			designation: 'Designation-4',
			designation_prefix: 'Desig-4'
		},
	])

	await Division.bulkCreate([{
			division: 'Division-1'
		},
		{
			division: 'Division-2'
		},
		{
			division: 'Division-3'
		},
		{
			division: 'Division-4'
		},
	])

	await Department.bulkCreate([{
			department: 'Department-1',
			costCenterCode: 'cc-1234',
			glCode: 'gl-1234',
			department_prefix: 'D1',
			workflowgroup_id: 1,
		},
		{
			department: 'Department-2',
			costCenterCode: 'cc-1234',
			glCode: 'gl-1234',
			department_prefix: 'D2',
			workflowgroup_id: 2,
		},
		{
			department: 'Department-3',
			costCenterCode: 'cc-1234',
			glCode: 'gl-1234',
			department_prefix: 'D3',
			workflowgroup_id: 2,
		},
		{
			department: 'Department-4',
			costCenterCode: 'cc-1234',
			glCode: 'gl-1234',
			department_prefix: 'D4',
			workflowgroup_id: 3,
		},
	])

	await Shift.bulkCreate([{
			shiftTitle: 'Shift-1',
			shiftCode: 'shift-001',
			shiftStartingTime: '09:00',
			shiftEndingTime: '17:00',
			shiftGraceTime: 'WTH is shift grace time?',
		},
		{
			shiftTitle: 'Shift-2',
			shiftCode: 'shift-002',
			shiftStartingTime: '10:00',
			shiftEndingTime: '18:00',
			shiftGraceTime: 'WTH is shift grace time?',
		},
		{
			shiftTitle: 'Shift-3',
			shiftCode: 'shift-003',
			shiftStartingTime: '12:00',
			shiftEndingTime: '20:00',
			shiftGraceTime: 'WTH is shift grace time?',
		},
		{
			shiftTitle: 'Shift-4',
			shiftCode: 'shift-004',
			shiftStartingTime: '15:00',
			shiftEndingTime: '00:00',
			shiftGraceTime: 'WTH is shift grace time?',
		},
	])

	await AttendanceFlag.bulkCreate([{
			attendanceFlag: 'Flag-1',
			attendanceFlagCategory: 'Attendance Flag Category-1',
			effectBy: 'Effect By',
			attendanceFlagType: 'Flag Type-1',
			attendanceFlagValue: 1.0,
		},
		{
			attendanceFlag: 'Flag-2',
			attendanceFlagCategory: 'Attendance Flag Category-2',
			effectBy: 'Effect By',
			attendanceFlagType: 'Flag Type-2',
			attendanceFlagValue: 2.0,
		},
		{
			attendanceFlag: 'Flag-3',
			attendanceFlagCategory: 'Attendance Flag Category-3',
			effectBy: 'Effect By',
			attendanceFlagType: 'Flag Type-3',
			attendanceFlagValue: 3.0,
		},
	])

	await Holiday.bulkCreate([{
			holidayDate: '2018-12-25',
			holiday: "Quaid's Day",
			holidayRemarks: 'Remarks'
		},
		{
			holidayDate: '2018-10-12',
			holiday: 'Halloween',
			holidayRemarks: 'Remarks'
		},
		{
			holidayDate: '2018-02-04',
			holiday: 'Kashmir Day',
			holidayRemarks: 'Remarks'
		},
	])

	await UserGroup.bulkCreate([{
			userGroup: 'User Group-1'
		},
		{
			userGroup: 'User Group-2'
		},
		{
			userGroup: 'User Group-3'
		},
	])

	await WorkflowUserGroup.bulkCreate([{
			userGroup_id: 1,
			workflowGroup_id: 2
		},
		{
			userGroup_id: 3,
			workflowGroup_id: 3
		},
		{
			userGroup_id: 2,
			workflowGroup_id: 2
		},
	])

	await ShiftFlag.bulkCreate([{
			from: '07:00',
			to: '14:00',
			shiftType: 'Shift Type-1',
			shift_id: 1,
			attendanceFlag_id: 2
		},
		{
			from: '09:00',
			to: '16:00',
			shiftType: 'Shift Type-2',
			shift_id: 3,
			attendanceFlag_id: 1
		},
		{
			from: '11:00',
			to: '18:00',
			shiftType: 'Shift Type-3',
			shift_id: 2,
			attendanceFlag_id: 3
		},
	])

	/* 	await EmployeeLeaveOpening.bulkCreate([
		{
			leaveYear: '2018',
			leaveType: 'Leave Type-1',
			balance: 2.1,
			isShortLeave: 0,
			leaveFrom: '2018-10-10',
			leaveTo: '2018-10-12',
		},
		{
			leaveYear: '2017',
			leaveType: 'Leave Type-2',
			balance: 2.7,
			isShortLeave: 0,
			leaveFrom: '2018-10-01',
			leaveTo: '2018-10-12',
		},
		{
			leaveYear: '2018',
			leaveType: 'Leave Type-3',
			balance: 2.2,
			isShortLeave: 0,
			leaveFrom: '2018-09-10',
			leaveTo: '2018-10-1',
		},
	]) 
	await LeaveSetup.bulkCreate([
		{ title: 'Setup title-1', sortIndex: 20, prefix: 'Prefix-1', leaveType: 'Leave Type-1' },
		{ title: 'Setup title-2', sortIndex: 10, prefix: 'Prefix-2', leaveType: 'Leave Type-2' },
		{ title: 'Setup title-3', sortIndex: 0, prefix: 'Prefix-3', leaveType: 'Leave Type-1' },
	])
	await LeavePolicy.bulkCreate([
	    {}
	])
	
	await LeavePolicyEmployeeWise.bulkCreate([
	    {}
	])

	await LeaveYearSetup.bulkCreate([
	    {year: "2018", startDate: "2018-10-10", endDate: "2018-12-13", isCurrentYear: 0},
	    {year: "2018", startDate: "2018-10-12", endDate: "2018-12-14", isCurrentYear: 1},
	    {year: "2018", startDate: "2018-10-18", endDate: "2018-12-21", isCurrentYear: 0},
	])

	await LeavePlanRequest.bulkCreate([
		{
			leaveYear: '2018',
			leaveType: 'Leave Type-1',
			balance: 10,
			isShortLeave: 1,
			shortLeaveValue: 2.1,
			shortLeaveTime: 'Short-time leave',
			leaveFrom: '2018-10-10',
			leaveTo: '2018-10-14',
		},
		{
			leaveYear: '2018',
			leaveType: 'Leave Type-2',
			balance: 9,
			isShortLeave: 0,
			leaveFrom: '2018-10-11',
			leaveTo: '2018-10-15',
		},
		{
			leaveYear: '2018',
			leaveType: 'Leave Type-3',
			balance: 12,
			isShortLeave: 1,
			shortLeaveValue: 2.1,
			shortLeaveTime: 'Short-time leave',
			leaveFrom: '2018-10-12',
			leaveTo: '2018-10-13',
		},
		{
			leaveYear: '2018',
			leaveType: 'Leave Type-4',
			balance: 13,
			isShortLeave: 1,
			shortLeaveValue: 2.1,
			shortLeaveTime: 'Short-time leave',
			leaveFrom: '2018-10-13',
			leaveTo: '2018-10-14',
		},
	])

	await YearEnd.bulkCreate([
		{ fromLeaveYear: '2018', toLeaveYear: '2018' },
		{ fromLeaveYear: '2017', toLeaveYear: '2019' },
		{ fromLeaveYear: '2017', toLeaveYear: '2018' },
	]) */



	const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS))
	const hash = bcrypt.hashSync('1234', salt)

	await Employee.bulkCreate([{
			username: 'user02',
			password: hash,
			leaveBalance: 5,
			machineCode: 'AD-124',
			employeeName: 'Daniyal Khalid',
			employeeType: 'supervisor',
			maritalStatus: 'Married',
			gender: 'Male',
			birthDate: '1997-10-06',
			cnic: '31201-7589170-0',
			mobileNo: '0304-4485855',
			email: 'mdaniyal.kh@gmail.com',
			address: 'Address-2',
			permanentAddress: 'Permanent Address',
			appointmentDate: '2010-10-10',
			leavingDate: '2010-12-10',
			confirmationDate: '2010-10-10',
			joiningDate: '2010-10-10',
			profileImage: '',
			designation_id: 1,
			branch_id: 2,
			department_id: 1,
			employeeCategory_id: 1,
			city_id: 2,
			country_id: 2,
			qualificationLevel_id: 1,
			division_id: 3,
			subDepartment_id: 1,
			qualification_id: 1,
			shift_id: 1,
		},
		{
			username: 'user01',
			password: hash,
			leaveBalance: 0.5,
			machineCode: 'AD-123',
			employeeName: 'John Doe',
			employeeType: 'admin',
			maritalStatus: 'Single',
			gender: 'Male',
			birthDate: '1997-10-06',
			cnic: '31201-7589170-9',
			mobileNo: '0305-6443339',
			email: 'mdaniyal.kh@gmail.com',
			address: 'Address-1',
			permanentAddress: 'Permanent Address',
			appointmentDate: '2010-10-10',
			leavingDate: '2010-12-10',
			confirmationDate: '2010-10-10',
			joiningDate: '2010-10-10',
			profileImage: '',
			designation_id: 2,
			branch_id: 1,
			department_id: 3,
			employeeCategory_id: 2,
			city_id: 1,
			country_id: 2,
			qualificationLevel_id: 1,
			division_id: 2,
			subDepartment_id: 1,
			qualification_id: 1,
			shift_id: 1,
		},
	])

	await Attendance.bulkCreate([{
			actualInDate: '2018-10-10',
			actualOutDate: '2018-10-10',
			inDate: '2018-10-10',
			outDate: '2018-10-10',
			actualInTime: '09:00',
			actualOutTime: '17:00',
			status: 'Status A',
			leave: 1,
			machineCode: 'AD-123',
			shift_id: 1,
		},
		{
			actualInDate: '2018-10-11',
			actualOutDate: '2018-10-11',
			inDate: '2018-10-11',
			outDate: '2018-10-11',
			actualInTime: '08:00',
			actualOutTime: '15:00',
			status: 'Status B',
			leave: 1,
			machineCode: 'AD-124',
			shift_id: 2,
		},
		{
			actualInDate: '2018-10-12',
			actualOutDate: '2018-10-12',
			inDate: '2018-10-12',
			outDate: '2018-10-12',
			actualInTime: '07:00',
			actualOutTime: '14:00',
			status: 'Status B',
			leave: 0,
			machineCode: 'AD-123',
			shift_id: 1,
		},
	])

	await AttendanceRequest.bulkCreate([{
		inDate: '2018-10-18',
		outDate: '2018-12-22',
		inTime: '13:00',
		outTime: '21:00',
		description: 'Description AR',
		status: 'pending',
		attendance_id: 1,
		requester_id: 'AD-123',
		approver_id: 'AD-124',
	}, ])

	await DefaultShift.bulkCreate([{
			shift_id: 1,
			machineCode: 'AD-123'
		},
		{
			shift_id: 2,
			machineCode: 'AD-124'
		},
	])

	await ScheduledShift.bulkCreate([{
			date: '2018-10-18',
			shift_id: 1,
			machineCode: 'AD-123'
		},
		{
			date: '2017-11-17',
			shift_id: 2,
			machineCode: 'AD-124'
		},
	])

	// Find all roles and add permissions to respective role.
	const roles = await Role.findAll({
		raw: true,
	})

	const permissionsObject = {
		admin: JSON.stringify(adminPrevileges),
		supervisor: JSON.stringify(supervisorPrevileges),
		developer: JSON.stringify(developerPrevileges),
	}
	const permissions = []
	roles.forEach(role => {
		permissions.push({
			permissions: permissionsObject[role.roleName],
			roleId: role.role_id
		})
	})

	await LeaveRequest.bulkCreate([{
			status: "pending",
			attendance_id: 1,
			requester_id: "AD-123",
			description: "Request one"
		},
		{
			status: "pending",
			attendance_id: 3,
			requester_id: "AD-123",
			description: "Request two"
		},
	]);

	await Permission.bulkCreate(permissions)


	console.log(JSON.stringify(adminPrevileges))
}