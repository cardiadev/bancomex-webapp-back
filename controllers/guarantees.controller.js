const Model = require('../models').Guarantee;	
const nameModel = "Guarantees";

//findAll
const findAll = async (req, res)=> {
    const result = await Model.findAll();
    if(!result)
    return res
    .status(404)
    .send({success:false, msg: `${nameModel} not found`});

    res
    .status(200)
    .send({success:true, result, msg: `${nameModel} found all`})

};

//find by Id
const findOne = async(req, res) =>{
    const {id} = req.params;
    const result = await Model.findAll({
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
const create = async(req, res) =>{
    try{
        const result = await Model.create({...req.body});
        res.status(200).send({
            success:true,
            result,
            msg:`${nameModel} was created successfully `,

        });
    }catch(error){
        res
        .status(400)
        .send({success:false, msg: ` ${nameModel}  wasn't create`, error})
    }

};

const createMany = async( arrayGuarantees, CreditId ) => {
    
    let result = [];
    try {
        for (let i = 0; i < arrayGuarantees.length; i++) {
            arrayGuarantees[i].CreditId = CreditId;
            const gCreated = await Model.create( { ...arrayGuarantees[i] });
            result = [...result, gCreated];
        }

        return result;
    } catch (error) {
        throw 'Error in create Many guarantees';
    }
    
}

//update
const update = async(req, res) =>{
    try{
        const{id} = req.params;
        const result= await Model.update({...req.body}, {where:{id}});
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

module.exports ={
    findAll,
    findOne,
    create,
    update,
    createMany
}
