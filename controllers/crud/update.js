module.exports = (models) => ({
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