const Model = require('../models').Credit
const nameModel = "Credit";

const guaranteeController = require('./guarantees.controller');

const findAll = async (req, res) => {
    const result = await Model.findAll()
    if(!result)
        return res
            .status(404)
            .send({ success: false, msg: `${nameModel} not found`});
        res
            .status(200)
            .send({success: true, result, msg: `${nameModel} found All`});
}

const findOne = async (req, res) => {
    const { id } = req.params;
    const result = await Model.findAll({
        where: {
            id,
        },
    });
    if(!result)
        return res
            .status(404)
            .send({ success: false, msg: `${nameModel} not found`});
        res
            .status(200)
            .send({ success: true , result, msg: `${nameModel} found with ${id}`});
}

const create = async(req, res)=>{
    try{
        
        if (req.user.role == 'Cajero') 
            return res.status(401).json({ msg: 'Denied Role Access' })
        
        

        //default info when you create a credit    
        req.body.credit.EmployeeId = req.user.id;
        const date = new Date();
        req.body.credit.applicationDate = date.toISOString(); 
        req.body.credit.status = 'Pendiente';
        req.body.credit.commission = 1;
        req.body.credit.interest = 14.7;
        
        const credit = await Model.create({ ...req.body.credit });

        // create all guarantees with this method, this method is in guarantees controller
        // first parameter, you have to send an guarantees array
        // second parameter, you have ti send the Credit Id created before
        const guarantees = await guaranteeController.createMany( req.body.guarantees, credit.id );

        res.status(200).send({
            success:true,
            result: { credit, 
                      guarantees },
            msg:`${nameModel} was created successfully `,
        });

    }catch(error){
        res
        .status(400)
        .send({success:false, msg: ` ${nameModel}  wasn't create`, error})
    }
};

const update = async(req, res) =>{
    try{
        const { id } = req.params;
        const result = await Model.update({ ...req.body}, {where: { id } });
        res
            .status(200)
            .send({success: true, result, msg: `${nameModel} was update succesfully`});
    }catch(error){
        res
            .status(404)
            .send({success: false, msg: `${nameModel} wasn't update`});
    }
};

const deleteOne = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await Model.destroy({where: { id } });
        res
            .status(200)
            .send({success: true, result, msg: `${nameModel} was deleted succesfully`});
    }catch(error){
        res
            .status(404)
            .send({success: false, msg:`${nameModel} wasn't deleted`});
    }
}

//Count all credits
const countCredits = async(req, res) =>{
    try{
        const result = await Model.findAll({})
        res.status(200).send({
            success:true,
            result,
            msg:`${nameModel} Total Credits found`
        });          
    
    }catch(error){
        res
        .status(404)
        .send({success:false, msg:`${nameModel} wasn't found`})
    }

};


module.exports = {findAll, findOne, create, update, deleteOne, countCredits}