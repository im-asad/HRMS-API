module.exports = (models) => ({
    // General function to create a new entry of model "model" with data "data"
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