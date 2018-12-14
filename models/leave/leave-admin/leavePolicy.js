const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("leavePolicy", {
        leaveYear: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        entitledQuantity: {
            type: Sequelize.STRING
        },
        maximumAllowedBalance: {
            type: Sequelize.INTEGER
        },
        maxLeaves: {
            type: Sequelize.INTEGER
        },
        minLeaves: {
            type: Sequelize.INTEGER
        },
        dayContinuationRestriction: {
            type: Sequelize.STRING
        },
        minLeaveIntimationPeriod: {
            type: Sequelize.STRING
        },
        canBeClaimedIn: {
            type: Sequelize.INTEGER
        },
        isEncashable: {
            type: Sequelize.BIGINT
        },
        encashmentLimit: {
            type: Sequelize.INTEGER
        },
        forMales: {
            type: Sequelize.BIGINT
        },
        forFemales: {
            type: Sequelize.BIGINT
        },
        forMarried: {
            type: Sequelize.BIGINT
        },
        isBalanceBroughtForward: {
            type: Sequelize.BIGINT
        },
        leaveDayType: {
            type: Sequelize.STRING
        },
        attachmentRequired: {
            type: Sequelize.BIGINT
        },
        shortLeaveAllowed: {
            type: Sequelize.BIGINT
        },
        allowedOneInService: {
            type: Sequelize.BIGINT
        },
        jobPeriodBased: {
            type: Sequelize.BIGINT
        },
        eligibility: {
            type: Sequelize.STRING
        },
        prorated: {
            type: Sequelize.BIGINT
        },
        isMonthBased: {
            type: Sequelize.BIGINT
        },
        allowLeaveReqOnZeroBalance: {
            type: Sequelize.BIGINT
        },
        active: {
            type: Sequelize.BIGINT
        },
        leaveApplicationLimit: {
            type: Sequelize.INTEGER
        },
        printOnPaySlip: {
            type: Sequelize.BIGINT
        },
    })
}