const Model = require('../models').DenominationCashCutOff
const nameModel = 'DenominationCashCutOff';

const findAll = async (req, res) => {
    const result = await Model.findAll ();
    if (!result)
        return res
            .status(404)
            .send({ success: false, msg: `${nameModel} not found`});
        res
            .status(200)
            .send({ success: true, result, msg: `${nameModel} found All`})
}

const findOne = async (req, res) => {
    const { id } = req.params;
    const result = await Model.findAll({
        where: {
            id,
        },
    });
    if (!result)
        return res
            .status(404)
            .send({ success: false, msg: `${nameModel} not found`});
        res
            .status(200)
            .send({ success: true, result, msg: `${nameModel}found with ${id}`})
};

const create = async (req, res) => {
    try{
        console.log(req.body)
        const result = await Model.create({ ...req.body });
        res.status(201)
            .send({success: true, result, msg: `${nameModel} was created succesfully`})
    }catch(error){
        console.log(error)
        res
            .status(400)
            .send({success: false, msg: `${nameModel} wasn't created`, error})
    }
};

const update = async(req, res) =>{
    try{
        const { id } = req.params;
        const result = await Model.update({ ...req.body}, { where: { id } });
        res
            .status(200)
            .send({ success: true,result, msg:`${nameModel} was update succesfully`});
    }catch (error){
        res
            .status(404)
            .send({ success: false, msg:`${nameModel} wasn't update`});
    }
};

const deleteOne = async (req, res) => {
    try{
        const { id } = res.params;
        const result = await Model.destroy({ where: { id }});
        res
            .status(200)
            .send({ success: true, result, msg: `${nameModel} wasn deleted succesfully`});
    }catch(error){
        res
            .status(404)
            .send({ success: false, msg:`${nameModel} wan't deleted`});
    }
}

module.exports = {findAll, findOne, create, update, deleteOne}