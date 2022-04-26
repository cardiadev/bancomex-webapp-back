
const Model = require('../models').Card;
const nameModel = "Cards";

//findAll
const findAll = async (req, res)=> {
    const result = await Model.findAll();
    if(!result)
    return res
        .status(400)
        .send({success: false, msg: `${nameModel} not found`});
    res 
        .status(200)
        .send({ success: true, result, msg: `${nameModel} found All`});
};

//Find byId
const findOneByIb = async (req,res) =>{
    const {id} = req.params;
    const result =await Model.findAll({
        where:{
            id,

        },
    });
    if(!result)
    return res
    .status(404)
    .send({success: false, msg:`${nameModel} not found`});

res
    .status(200)
    .send({success: true, result, msg: `${nameModel} found whit ${id}`});

};

//create
const create = async(req, res)=>{
    try{
        const result = await Model.create({...req.body});
        res.status(200).send({
            success:true,
            result,
            msg:`${nameModel} was create successfully`,
    });
    }catch(error){
        res
        .status(404)
        .send({success:false,  msg:`${nameModel} wasn't created`})

    }
};

//update
const update = async(req, res) => {
    try{
        const {id} = req.params;
        const result = await Model.update({...req.body}, {where:{id}});
        res.status(200).send({
            success:true,
            result,
            msg:`${nameModel} was updated succesfuly`,

        });   
    }catch(error){
        res
        .status(404)
        .send({success:false, msg:`${nameModel} wasn't updated`})
    }
};



module.exports = {
    findAll,
    findOneByIb,
    create,
    update
     
}