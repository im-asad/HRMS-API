module.exports = (models) => ({
    /* 
        general function to update a model "model" with primary key "id_key"
        having value "id" with new data "newData"
    */
    execute: async (model, id, id_key, newData) => {
        whereClause = {};
        whereClause[id_key] = id;
        try {
            await models[model].update(newData, {
                where: whereClause
            });
            return 1;
        } catch (e) {
            return -1;
        }
    }
});