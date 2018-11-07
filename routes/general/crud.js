const router = require("express").Router();

module.exports = (sequelize) => {



    const CRUD = require('../../controllers/crud/')(sequelize);

    router.post("/test", async (req,res) =>{
        let records = await CRUD.read.readAll("City");
        if (records !== -1){res.json(records);}
    })

    router.post("/CRUD/:module/:entity/:operation", async (req,res) => {
        // TO DO: check permissions
        

        // TO DO: fetch the correct mode
        const module = req.params.module;
        const entity = req.params.entity;
        const operation = req.params.operation;

        // TO DO: check if entity is valid

        // TO DO: use CRUD controller 
        let status;
        switch (operation){
            case "create":
                // create entity
                if (!(req.body.data)){
                    return res.sendStatus(400);
                }
                status = await CRUD.create.create(entity, req.body.data)
                if (status === 1){
                    return res.sendStatus(200);
                }
                else {
                    return res.sendStatus(400);
                }
                break;
            
            case "delete":
                // delete entity
                if (!(req.body.id) || !(req.body.id_key)){
                    return res.sendStatus(400);
                }
                status = await CRUD.remove.remove(entity, req.body.id, req.body.id_key);
                if (status === 1){
                    return res.sendStatus(200);
                } else {
                    return res.sendStatus(400);
                }
                break;
            
            case "update":
                // update entity
                status = await CRUD.update.update(entity, req.body.data);
                if (status === 1){
                    return res.sendStatus(200);
                } else {
                    return res.sendStatus(400);
                }
                break;
            
            case "read":
                // read entity
                break;
            default:
                // return UnsupportedOperationError

        }
        
    })
    return router;
}