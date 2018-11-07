module.exports = (models) => ({
    readAll: async (model)=> {
        try {
         console.log("models", models);
         let records = await models[model].findAll({ include: [{ all: true }]});
         return records.map(r => r.dataValues);
        }
        catch (e) {
            console.log("Could not read model", model);
            console.log(e);
            return -1;
        }
    } 
 });