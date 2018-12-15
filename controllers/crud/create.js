module.exports = (models) => ({
   execute: async (model, data)=> {
       try {
        await models[model].create(data);
        return 1;
       }
       catch (e) {
           return -1;
       }
   } 
});