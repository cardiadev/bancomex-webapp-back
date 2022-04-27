const { generateQR } = require('../common/functions/generateqr');
const { sendEmail } = require('../common/mailService/mail.service');
const Model = require('../models').Client
const ModelAccount = require('../models').Account
const ModelCard = require('../models').Card
const nameModel = 'Client';

const findAll = async(req,res) => {
    const result = await Model.findAll();
    if(!result)
    return res
        .status(404)
        .send({ succes: false, msg: `${nameModel} not found`});
    res
        .status(200)
        .send({succes:true, result, msg: `${nameModel} found All`})
}

const findOne = async (req,res) => {
    const { id } = req.params;
    const result = await Model.findAll({
        where: {
            id,
        },
    });
    if (!result) 
        return res
            .status(404)
            .send({succes: false, msg:`${nameModel} not found`});
        res
            .status(200)
            .send({succes: true, result, msg:`${nameModel} found with ${id}`});
};

const create = async (req, res) => {
    try{

        if (req.user.role !== 'Ejecutivo' || req.use.role !== 'Gerente') 
            return res.status(401).json({ msg: 'Denied Role Access' })
            
        req.body.EmployeeId = req.user.id;
        req.body.active = true;
        req.body.BranchId = 1;

        const result = await Model.create({ ...req.body});
        //create QR end send the QR for email.
        generateQR('ID:'+result.id).then(url => {
            sendEmail(result, url)
          })
        res
            .status(201)
            .send({succes: true, result, msg:`${nameModel} was created succesfully`});

    }catch(error){
        res
            .status(400)
            .send({succes: false, msg:`${nameModel} wasn't created`, error:error.message})
    }
};

const update = async(req, res) => {
    try{
        const { id } = req.params;
        const result = await Model.update({ ...req.body}, { where: { id }});
        res
            .status(200)
            .send({succes: true, result, msg:`${nameModel} was update succesfully`});
    }catch(error){
        res
            .status(404)
            .send({succes: false, msg:`${nameModel} wasn't update`})
    }
};

const deleteOne = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await Model.destroy({where: { id } });
        res
            .status(200)
            .send({succes: true, result, msg:`${nameModel} was deleted succesfully`});
    }catch(error){
        res
            .status(404)
            .send({succes: false, msg:`${nameModel} wasn't deleted`})
    }
}

const findAllHisAcounts = async(req, res) =>{
    try{
        const id = parseInt(req.params.id)
        const result = await Model.findOne({
        attributes: ['firstName', 'lastName', 'curp', 'active'],
        where: {
            id
        },
        include:{
            attributes: ['state', 'type', 'id'],
            model: ModelAccount,
            include:{
                where:{
                    state: true,
                },
                attributes: ['cardNumber'],
                model: ModelCard,
            }
        },
        });
        if(!result) throw new Error(`${nameModel} not found by ${id}`)
        res
            .status(200)
            .send({success: true, result, msg: `${nameModel} found All`});

    }catch(err){
        console.log(err)
        res
          .status(404)
          .send({succes: false, msg: err });
    }
  }

module.exports = {findAll, findOne, create, update, deleteOne, findAllHisAcounts}