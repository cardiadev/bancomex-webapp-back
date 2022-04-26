const { generateQR } = require('../common/functions/generateqr');
const { sendEmail, sendEmailWithCard } = require('../common/mailService/mail.service');
const Model = require('../models').Client
const Account = require("../models").Account
const Card = require('../models').Card
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
        
        //verify If the client exists
        const clientExist = await Model.findOne( { where: req.body.curp } );

        if (clientExist) 
            return res.status(400).send({success: false, msg: `This ${req.body.client.curp} is already registered`});

        req.body.EmployeeId = req.user.id;
        req.body.client.active = true;
        req.body.client.BranchId = 1;

        const result = await Model.create({ ...req.body.client });
        
        //crate account
        req.body.account.ClientId = result.id;
        const date = new Date();
        req.body.account.dateCreate = date.toISOString();
        req.body.account.amount = 0;
        req.body.account.state = true; 
        const resultAc = await Account.create({ ...req.body.account });

        //create card
        const cardInfo = {
            cardNumber: 0,
            nip: Math.floor(Math.random() * (9999 - 1000)) + 1000,
            dateExpiration: '',
            state: true,
            AccountId: resultAc.id
        }

        const newCardNumber = '4125874' + 
                              (resultAc.type == 'Credito' ? '1' : '2') + 
                              ( 1000 + resultAc.id ) + 
                              ( Math.floor(Math.random() * (9999 - 1000)) + 1000 );

        cardInfo.cardNumber = newCardNumber;

        cardInfo.dateExpiration = new Date(new Date().setFullYear(new Date().getFullYear() + 4));

        const cardCreated = await Card.create({ ...cardInfo });

        //create QR end send the QR for email.
        generateQR('ID:'+result.id).then(url => {
            sendEmail(result, url)
        });

        sendEmailWithCard(result, cardCreated);

        res
            .status(201)
            .send({success: true, result: { client: result, account: resultAc, card: cardCreated }, msg:`${nameModel} was created succesfully`});

    } catch(error){
        res
            .status(400)
            .send({success: false, msg:`${nameModel} wasn't created`, error})
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

module.exports = {findAll, findOne, create, update, deleteOne,}