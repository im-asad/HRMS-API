module.exports = models => ({
	// general function to read a model "model", performing a join on all foreign keys
	execute: async model => {
		try {
			let records = await models[model].findAll({
				include: [{ all: true }],
			})

			return records.map(r => {
				return r.dataValues
			})
		} catch (e) {
			return -1
		}
	},
})
