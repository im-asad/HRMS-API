const moment = require('moment-business-days')
const Op = require('sequelize').Op
const schedule = require('node-schedule');

module.exports = sequelize => {
    const models = require('../../models')(sequelize)
    const attendanceController = require("../attendance/shifts")(sequelize);

   async  function addMonthlyLeaveCredits() {
        let leavePolicy = await models.LeavePolicy.findOne({
            where: {
                id: 1
            }
        });
    
        let employees = await models.Employee.findAll({});

        employees.forEach(employee => {
            employee.update({
                leaveBalance: ((parseInt(employee.leaveBalance) + (leavePolicy.leaveDays / 12)) *100)/100
            })
        })
    }

    
    schedule.scheduleJob({month: 0 , date: 1,hour: 0, minute: 0}, addMonthlyLeaveCredits);
    schedule.scheduleJob({month: 1, date: 1 ,hour: 0, minute: 0}, addMonthlyLeaveCredits);
    schedule.scheduleJob({month: 2, date: 1 ,hour: 0, minute: 0}, addMonthlyLeaveCredits);
    schedule.scheduleJob({month: 3, date: 1 ,hour: 0, minute: 0}, addMonthlyLeaveCredits);
    schedule.scheduleJob({month: 4, date: 1 ,hour: 0, minute: 0}, addMonthlyLeaveCredits);
    schedule.scheduleJob({month: 5, date: 1 ,hour: 0, minute: 0}, addMonthlyLeaveCredits);
    schedule.scheduleJob({month: 6, date: 1 ,hour: 0, minute: 0}, addMonthlyLeaveCredits);
    schedule.scheduleJob({month: 7 , date: 1,hour: 0, minute: 0}, addMonthlyLeaveCredits);
    schedule.scheduleJob({month: 8, date: 1 ,hour: 0, minute: 0}, addMonthlyLeaveCredits);
    schedule.scheduleJob({month: 9 , date: 1,hour: 0, minute: 0}, addMonthlyLeaveCredits);
    schedule.scheduleJob({month: 10 , date: 1,hour: 0, minute: 0}, addMonthlyLeaveCredits);
    schedule.scheduleJob({month: 11 , date: 1,hour: 0, minute: 0}, addMonthlyLeaveCredits);

    schedule.scheduleJob({month: 0 , date: 1,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);
    schedule.scheduleJob({month: 1, date: 1 ,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);
    schedule.scheduleJob({month: 2, date: 1 ,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);
    schedule.scheduleJob({month: 3, date: 1 ,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);
    schedule.scheduleJob({month: 4, date: 1 ,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);
    schedule.scheduleJob({month: 5, date: 1 ,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);
    schedule.scheduleJob({month: 6, date: 1 ,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);
    schedule.scheduleJob({month: 7 , date: 1,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);
    schedule.scheduleJob({month: 8, date: 1 ,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);
    schedule.scheduleJob({month: 9 , date: 1,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);
    schedule.scheduleJob({month: 10 , date: 1,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);
    schedule.scheduleJob({month: 11 , date: 1,hour: 0, minute: 0}, attendanceController.generateMonthlyShifts);

    schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, attendanceController.processWeeklyAttendance);

        



}