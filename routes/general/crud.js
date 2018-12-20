const router = require('express').Router()
const middlewares = require("../../middlewares/auth");

module.exports = sequelize => {
	const CRUD = require('../../controllers/crud/')(sequelize)
	const models = require("../../models/")(sequelize);

	// hander for general CRUD requests
	// The details of the CRUD methods are in the crud controller files
	let handleRequest = async (req, res) => {
		const entity = req.params.entity
		const operation = req.params.operation

		let status
		switch (operation) {
			case 'create':
				// create entity
				if (!req.body.data) {
					return res.sendStatus(400)
				}
				status = await CRUD.create.execute(entity, req.body.data)
				if (status === 1) {
					return res.sendStatus(200)
				} else {
					return res.sendStatus(400)
				}
				break

			case 'delete':
				// delete entity
				if (!req.body.id || !req.body.id_key) {
					return res.sendStatus(400)
				}
				status = await CRUD.remove.execute(entity, req.body.id, req.body.id_key)
				if (status === 1) {
					return res.sendStatus(200)
				} else {
					return res.sendStatus(400)
				}
				break

			case 'update':
				// update entity
				status = await CRUD.update.execute(entity, req.body.id, req.body.id_key, req.body.data)
				if (status === 1) {
					return res.sendStatus(200)
				} else {
					return res.sendStatus(400)
				}
				break

			case 'read':
				// read entity
				let records = await CRUD.read.execute(entity)
				if (records !== -1) {
					return res.json(records)
				} else {
					return res.sendStatus(400)
				}
				break
			default:
				return res.sendStatus(400)
		}
	}

	router.post('/CRUD/:module/:entity/:operation', handleRequest)


	// Route to fetch select options
	router.post("/select", async (req,res)=>{
		let obj = req.body;
		let promises = [];
		try {
			obj.forEach(model=>{
				let attr = [];
				attr[0] = [model.attributes[0],"value"];
				attr[1] = [model.attributes[1], "text"];
				promises.push(models[model.model].findAll(
					{attributes: attr}
				));
				
			})
			let promiseResults = await Promise.all(promises);
			let response = {};
			promiseResults.forEach((result, index)=>{
				response[obj[index].id] = result;
			})
			return res.json(response);
		}

		catch (e){}
	})
	return router
}
