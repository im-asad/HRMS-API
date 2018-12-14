const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Role = sequelize.define("role", {
        role_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleName: {
            type: Sequelize.STRING,
        }
    })

    return Role;
}