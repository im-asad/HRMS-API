module.exports = models => ({
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
