
const Model = require('../models').Card;
const ModelAccount = require("../models").Account
const ModelClient = require("../models").Client
const nameModel = "Cards";

//findAll
const findAll = async (req, res)=> {
    const result = await Model.findAll();
    if(!result)
    return res
        .status(400)
        .send({succes: false, msg: `${nameModel} not found`});
    res 
        .status(200)
        .send({ succes: true, result, msg: `${nameModel} found All`});
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

// Endpoint: find Card with his Account and Client by Card's Number
const findByCardNumber = async (req, res) => {
    try{
      const {cardNumber} = req.params
      const result = await Model.findOne({
        attributes: ['cardNumber'],
        where: {
            cardNumber:cardNumber
        },
        include:{
          attributes: ['state', 'type'],
          model: ModelAccount,
          include:{
            attributes: ['firstName', 'lastName', 'active'],
            model: ModelClient
          }
        },
      });
  
      if(result){
        res
          .status(200)
          .send({success: true, result, msg: `${nameModel} found`})
      }else{
        throw new Error(`${nameModel} not found`)
      }
  
    }catch(error){
      return res
        .status(404)
        .send({success: false, msg: error });
    }
  }

//create
const create = async(req, res)=>{
    try{
        const result = await Model.create({...req.body});
        res.status(200).send({
            succes:true,
            result,
            msg:`${nameModel} was create successfully`,
    });
    }catch(error){
        res
        .status(404)
        .send({succes:false,  msg:`${nameModel} wasn't created`})

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
    update,
    findByCardNumber
}