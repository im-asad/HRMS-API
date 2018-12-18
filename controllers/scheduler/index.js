const moment = require('moment-business-days')
const Op = require('sequelize').Op

module.exports = sequelize => {
    const models = require('../../models')(sequelize)


    let leavePolicy = await models.LeavePolicy.findOne({
        where: {
            id: 1
        }
    });

    return {
        addMonthlyLeaveCredits: async () => {
            let employees = await models.Employee.findAll({});

            employees.forEach(employee => {
                employee.update({
                    leaveBalance: parseInt(employee.leaveBalance) + (leavePolicy.leaveDays / 12)
                })
            })
        }
    }



}