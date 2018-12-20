module.exports = (models) => ({
    // general function to delete a model "model" with primary key "id_key" having a value of "id"
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
            return -1;
        }
    } 
 });