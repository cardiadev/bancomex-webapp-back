const Model = require("../models").Account
const ModelClient = require("../models").Client
const nameModel = "Accounts"

//  Endpoint: findAll
const findAll = async (req, res) => {
    const result = await Model.findAll();
    if(!result)
    return res
        .status(404)
        .send({success: false, msg: `${nameModel} not found` });
    res
        .status(200)
        .send({success: true, result, msg: `${nameModel} found All`});
}

//Endpoint: findByPk
const findByPk = async (req, res) => {
    const { id } = req.params;
    const result = await Model.findByPk(id);
    if (!result)
        return res
            .status(400)
            .send({ success: false, msg: `${nameModel} not found `});
    res
        .status(200)
        .send({ success: true, result, msg: `${nameModel} found with ${id}` });
};

//  Endpoint: create
const create = async (req, res) => {
    try {
      const result = await Model.create({ ...req.body });
      res.status(201).send({
        success: true,
        result,
        msg: `${nameModel} was created successfully`,
      });
    } catch (error) {
      res
        .status(404)
        .send({ success: false, msg: `${nameModel} wasn't created` }, error);
    }
  };

// Endpoint: findByClientId
const findByClientId = async (req, res) => {
  try{
    const {id} = req.params
    const result = await Model.findOne({
      where: {
       id:parseInt(id),
       //state: true,       
      },
      include:{
        model: ModelClient
      }
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

// Endpoint: deposit
const deposit = async (req, res) => {
  try{
    const {id, amountDeposit} = req.body

      const deposit = await Model.increment({amount: amountDeposit},{
        where: {
          id:parseInt(id),
          state: true
        }
      });
      if(!deposit){   
        throw new Error(`${nameModel} not increment`)
      }else{
        res
        .status(200)
        .send({success: true, deposit, msg: `${nameModel} increment`})
      }

   }catch(error){
    return res
      .status(404)
      .send({success: false, msg: error });
   }
}

// Endpoint: update
const update = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Model.update({ ...req.body }, { where: { id } });
      res.status(200).send({
        success: true,
        result,
        msg: `${nameModel} was updated successfully`,
      });
    } catch (error) {
      res
        .status(404)
        .send({ success: false, msg: `${nameModel} wasn't updated` });
    }
  };

  //Endpiont:Count  all Accounts
  const countAccounts = async(req, res) => {
    try{
      const result = await Model.count({
        where: {
          status: true
        }
      });
      res.status(200).send({
        success:true,
        result,
        msg: `${nameModel} Total Accounts found`
      });
    }catch(error){
        res
        .status(404)
        .send({ success: false, msg: `${nameModel} wasn't found` });
      } 
  };

  const dineroTotalBank = async(req, res) =>{
    try{
      const result = await Model.findByPk({where: {
        ClientId : 1
      }})

      res.status(200).send({
        success:true,
        result:result.amount,
        msg:`${nameModel} Total Amount Bank`
      });
    }catch(error){
      res
      .status(404)
      .send({ success: false, msg: `${nameModel} wasn't found` });


    }
  }



  module.exports = {
    findAll,
    findByPk,
    create,
    update,
    countAccounts,
    deposit,
    findByClientId
  }; 
