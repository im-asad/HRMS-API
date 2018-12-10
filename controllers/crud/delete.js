module.exports = (models) => ({
    execute: async (model, id, id_key)=> {
        try {
         whereClause = {};
         whereClause[id_key] = id;
         await models[model].destroy({
             where: whereClause
         });
         return 1;
        }
        catch(e){
            console.log("Could not delete model", model, "with id", id);
            console.log(e);
            return -1;
        }
    } 
 });