const Model = require("../models").Transaction
const ModelCharge = require("../models").Charge
const ModelAccount = require("../models").Account
const ModelCard = require('../models').Card;
const nameModel = "Transactions"

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
      req.body.EmployeeId = req.user.id;
      const result = await Model.create({ ...req.body });
      res.status(201).send({
        success: true,
        result,
        msg: `${nameModel} was created successfully`,
      });
    } catch (error) {
      res
        .status(400)
        .send({ success: false, msg: `${nameModel} wasn't created` }, error);
    }
  };

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

  //Find ammount and type of Charge
  const findChargeByName = (name, t) => ModelCharge.findOne({
    attributes: ['id', 'amount', 'type'],
    where: {
      name,
      active: true
    }
  }, { transaction: t });

  // Find id and amount of Account by his Card
  const findAccountByCard = (whereCard, t) => ModelCard.findOne({
    attributes: ['cardNumber'],
    where: whereCard,
    include:{
      attributes: ['id', 'state', 'amount', 'type'],
      model: ModelAccount
    },
  }, { transaction: t });

  const applyCharge = ({initialAmount, amount, type}, chargeAmount, chargeType) => {
    if(chargeType === 'percentage') chargeAmount = amount * chargeAmount / 100
    switch (type) {
      case 'Depositar':
        amount = (+1)*(amount - chargeAmount)
        break
      case 'Retirar':
        amount = (-1)*(amount + chargeAmount)
        break;
      default:
        return {err:'Charge not found'}
    }
    const endAmount = initialAmount + amount
    return {endAmount, amount}
  }

  // Update Account's amount
  const incrementAccount = (amount, id, t) => ModelAccount.increment({amount},{
    where: {
      id,
      state: true
    }
  }, {transaction: t });

  // EndPoint: Create Transaction
  const generate = async (req, res) => {
    try {
      const {amount, type, cardNumber} = req.body
      const data = {
        date: new Date(),
        type,
        amount: Math.abs(parseFloat(amount)),
        //EmployeeId,
        //CashBoxId,
        //AccountId,
        //ChargeId,
      }
      
      const result = await Model.sequelize.transaction(async (t) => {

        const charge = await findChargeByName(data.type, t)
        if(!charge){
          throw new Error(`Charge "${data.type}" not found`)
        }
        data.ChargeId = charge.id
        
        let whereCard = {cardNumber}
        whereCard = (data.type==="Retirar")?
        {cardNumber, nip: parseInt(req.body.nip)}:whereCard
        const card = await findAccountByCard(whereCard, t)
        if(!card){
          throw new Error(`Card "${cardNumber}" not found`)
        }
        data.AccountId = card.Account.id
        data.initialAmount = card.Account.amount
        console.log(data)
        const prove = applyCharge(data, charge.amount, charge.type)
        if(prove.err) throw new Error(prove.err)
        if(prove.endAmount<0) throw new Error(`insufficient amount in account`)
        data.endAmount = prove.endAmount

        const increment = await incrementAccount(prove.amount, data.AccountId, t)
        if(!increment){
          throw new Error(`Account not increment ${prove.amount}`)
        }
        console.log(increment[0][0][0].amount)
        //throw new Error(`Prueba xD`)
        return await Model.create(data, { transaction: t });
      });

      res.status(200).send({
        success: true,
        result,
        msg: `${nameModel} was created successfully`,
      });

    } catch (error) {
      res
        .status(404)
        .send({ success: false, msg:`${nameModel} wasn't created`, error:error.message});
    }
  };

  module.exports = {
    findAll,
    findByPk,
    create,
    update,
    generate
  }; 
