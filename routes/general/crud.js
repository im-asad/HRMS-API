const router = require("express").Router();

module.exports = (sequelize) => {



    const CRUD = require('../../controllers/crud/')(sequelize);
    console.log("==CRUD==")
    console.log(CRUD.create.create);

    router.post("/test", (req,res) =>{
        console.log(JSON.parse(req.body.data));
        let data = JSON.parse(req.body.data);
        CRUD.create.create("City", data);
        return res.sendStatus(200);
    })

    router.post("/CRUD/:module/:entity/:operation", async (req,res) => {
        // TO DO: check permissions
        

        // TO DO: fetch the correct mode
        const module = req.params.module;
        const entity = req.params.entity;
        const operation = req.params.operation;

        // TO DO: use CRUD controller 
        let status;
        switch (operation){
            case "create":
                // create entity
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
                status = await CRUD.remove.remove(entity, req.body.data);
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