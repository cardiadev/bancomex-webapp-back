const { generateQR } = require('../common/functions/generateqr')
const { sendEmail, sendEmailWithCard } = require('../common/mailService/mail.service')
const Model = require('../models').Client
const ModelAccount = require('../models').Account
const ModelCard = require('../models').Card
const Account = require("../models").Account
const Card = require('../models').Card
const Beneficiary = require('../models').Beneficiary

const nameModel = 'Client';

const findAll = async(req,res) => {
    const result = await Model.findAll();
    if(!result)
    return res
        .status(404)
        .send({ success: false, msg: `${nameModel} not found`});
    res
        .status(200)
        .send({success:true, result, msg: `${nameModel} found All`})
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
            .send({success: false, msg:`${nameModel} not found`});
        res
            .status(200)
            .send({success: true, result, msg:`${nameModel} found with ${id}`});
};

const create = async (req, res) => {
    try{
        if (req.user.role == 'Cajero') 
            return res.status(401).json({ msg: 'Denied Role Access' })
        
        //verify If the client exists by CURP
        const clientExist = await Model.findOne( { 
                                                    where: { 
                                                        curp: req.body.client.curp 
                                                    } 
                                                } );

        if (clientExist) 
            return res.status(400).send({success: false, msg: `This ${req.body.client.curp} is already registered`});

        req.body.EmployeeId = req.user.id;
        req.body.client.active = true;
        req.body.client.BranchId = 1;

        const result = await Model.create({ ...req.body.client });
        
        //crate account

        req.body.account.ClientId = result.id;
        const date = new Date();
        //date today 
        req.body.account.dateCreate = date.toISOString();
        req.body.account.amount = 0;
        req.body.account.state = true; 

        // crating account 
        const resultAc = await Account.create({ ...req.body.account });

        //create card
        /* 
            There is information for default
            cardNumber: generate authomatically
            nip: generet random, only 4 digits
            dateExpiration: today + 4 years
        */
        const cardInfo = {
            cardNumber: 0,
            nip: Math.floor(Math.random() * (9999 - 1000)) + 1000,
            dateExpiration: '',
            state: true,
            AccountId: resultAc.id
        }

        // generate card number
        const newCardNumber = '4125874' + 
                              (resultAc.type == 'Credito' ? '1' : '2') + 
                              ( 1000 + resultAc.id ) + 
                              ( Math.floor(Math.random() * (9999 - 1000)) + 1000 );

        cardInfo.cardNumber = newCardNumber;

        //generate date expiration
        cardInfo.dateExpiration = new Date(new Date().setFullYear(new Date().getFullYear() + 4));

        // creating card
        const cardCreated = await Card.create({ ...cardInfo });

        //create QR end send the QR for email.
        generateQR('ID:'+result.id).then(url => {
            sendEmail(result, url)
        });

        //send email with the info card
        sendEmailWithCard(result, cardCreated);

        //creating a beneficiary for the account
        req.body.beneficiary.AccountId = resultAc.id;
        const beneficiaryCreated = await Beneficiary.create( {...req.body.beneficiary} );
        

        res
            .status(201)
            .send({success: true, result: { client: result, 
                                            account: resultAc, 
                                            card: cardCreated,
                                            beneficiary: beneficiaryCreated 
                                          }, msg:`${nameModel} was created succesfully`});

    } catch(error){
        res
            .status(400)
            .send({success: false, msg:`${nameModel} wasn't created`, error:error.message})
    }
};

const update = async(req, res) => {
    try{
        const { id } = req.params;
        const result = await Model.update({ ...req.body}, { where: { id }});
        res
            .status(200)
            .send({success: true, result, msg:`${nameModel} was update succesfully`});
    }catch(error){
        res
            .status(404)
            .send({success: false, msg:`${nameModel} wasn't update`})
    }
};

const deleteOne = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await Model.destroy({where: { id } });
        res
            .status(200)
            .send({success: true, result, msg:`${nameModel} was deleted succesfully`});
    }catch(error){
        res
            .status(404)
            .send({success: false, msg:`${nameModel} wasn't deleted`})
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

  const countClients = async(req, res) =>{
    try{
        const result = await Model.count({
            where:{
                EmployeeId: req.user.id
            }
        });
        res
        .status(200)
        .send({success: true, result, msg: `${nameModel} found All`});
    } catch(error){
        res
          .status(404)
          .send({succes: false, msg: err });
    }
  };

module.exports = {findAll, findOne, create, update, deleteOne, findAllHisAcounts, countClients}