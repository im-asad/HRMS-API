const router = require('express').Router()

module.exports = sequelize => {
	const CRUD = require('../../controllers/crud/')(sequelize)
	const models = require("../../models/")(sequelize);

	router.post('/CRUD/:module/:entity/:operation', async (req, res) => {
		// TO DO: check permissions

		// TO DO: fetch the correct mode
		const module = req.params.module
		const entity = req.params.entity
		const operation = req.params.operation

		// TO DO: check if entity is valid

		// TO DO: use CRUD controller
		let status
		switch (operation) {
			case 'create':
				// create entity
				console.log('===CREATING===')
				console.log(req.body.data)
				if (!req.body.data) {
					return res.sendStatus(400)
				}
				status = await CRUD.create.create(entity, req.body.data)
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
				status = await CRUD.remove.remove(entity, req.body.id, req.body.id_key)
				if (status === 1) {
					return res.sendStatus(200)
				} else {
					return res.sendStatus(400)
				}
				break

			case 'update':
				console.log('===UPDATING===')
				// update entity
				status = await CRUD.update.update(entity, req.body.id, req.body.id_key, req.body.data)
				if (status === 1) {
					return res.sendStatus(200)
				} else {
					return res.sendStatus(400)
				}
				break

			case 'read':
				let records = await CRUD.read.readAll(entity)
				if (records !== -1) {
					return res.json(records)
				} else {
					return res.sendStatus(400)
				}
				break
			default:
				// return UnsupportedOperationError
				return res.sendStatus(400)
		}
	})


	router.post("/select", async (req,res)=>{
		console.log("select request working");
		let obj = req.body;
		let promises = [];
		try {
			obj.forEach(model=>{
				console.log(model);
				let attr = [];
				attr[0] = [model.attributes[0],"value"];
				attr[1] = [model.attributes[1], "text"];
				promises.push(models[model.model].findAll(
					{attributes: attr}
				));
				
			})
			console.log("awaiting promises");
			let promiseResults = await Promise.all(promises);
			let response = {};
			console.log("promise loop");
			promiseResults.forEach((result, index)=>{
				response[obj[index].id] = result;
			})
			console.log("sending result");
			return res.json(response);
		}

		catch (e){}
	})
	return router
}
