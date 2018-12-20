module.exports = (sequelize) =>  {

    // fetch all the models
    const models = require('../../models/')(sequelize)

    // returns an object which composes the create, delete, update and read objects
   return {
        create: require("./create")(models),
        remove: require("./delete")(models),
        update: require("./update")(models),
        read: require("./read")(models)
    }


}