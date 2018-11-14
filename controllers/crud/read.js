module.exports = (models) => ({
    readAll: async (model)=> {
        try {
         let records = await models[model].findAll({ include: [models.LeavingReason]});

         return records.map(r => {console.log(r); return r.dataValues});
        }
        catch (e) {
            console.log("Could not read model", model);
            console.log(e);
            return -1;
        }
    } 
 });