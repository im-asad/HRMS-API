module.exports = (models) => ({
    update: async (model, newData)=> {
         await models[model].update(newData,{
             where: {
                 id: id
             }
         });
    } 
 });