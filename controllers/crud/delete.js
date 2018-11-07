module.exports = (models) => ({
    remove: async (model, id)=> {
        try {
         await models[model].destroy({
             where: {
                 id: id
             }
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