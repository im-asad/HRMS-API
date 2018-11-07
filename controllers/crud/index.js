module.exports = (sequelize) =>  {

    // fetch all the models
    const models = require('../../models/')(sequelize)

   return {
        create: require("./create")(models),
        remove: require("./delete")(models),
        update: require("./update")(models),
        read: require("./read")(models)
    }


}