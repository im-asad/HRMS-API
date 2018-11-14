const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("employee", {

        employee_name: {
            type: Sequelize.STRING
        },

        machineCode: {
            type:Sequelize.STRING,
            primaryKey:true,
        },

        employee_country: {
            type: Sequelize.STRING
        },

        maritalStatus: {
            type: Sequelize.STRING
        },

        gender: {
            type: Sequelize.STRING
        },


        birthDate: {
            type: Sequelize.STRING
        },


        CNIC: {
            type: Sequelize.STRING
        },

        mobileNo: {
            type: Sequelize.STRING
        },

        email: {
            type: Sequelize.STRING
        },

        address: {
            type: Sequelize.STRING
        },

        permanentAddress: {
            type: Sequelize.STRING
        },

        appointmentDate: {
            type: Sequelize.STRING
        },

        leavingDate: {
            type: Sequelize.STRING
        },

        confirmationDate: {
            type: Sequelize.STRING
        },

        joiningDate: {
            type: Sequelize.STRING
        },

      
    })
}