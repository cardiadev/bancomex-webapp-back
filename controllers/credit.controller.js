const Model = require('../models').Credit
const Client = require('../models').Client
const Account = require('../models').Account
const Card = require('../models').Card
const Employee = require('../models').Employee
const Properties = require('../models').Property
const Guarantee = require('../models').Guarantee

const nameModel = "Credit";
const { sendEmailCreditAllow, sendEmailCreditDenied } = require('../common/mailService/mail.service')

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

const findFilterStatus = async (req, res) => {
    
    try {
        const { status } = req.params;
        let result;
        if (!status || status === 'Todo' ) {
            result = await Model.findAll();
            return res.status(200).send({success: true, result, msg: `Creditos encontrados correctamente`});;
        }
    
        result = await Model.findAll({
            where: {
               status 
            }
        })
    
        res.status(200).send({success: true, result, msg: `Creditos encontrados correctamente`});
    } catch (error) {
        res.status(200).send({success: false, msg: `Algo salio mal...`});
    }
    
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

const findOneJoin = async (req, res) => {
    try {
        const { id } = req.params;
        const credit = await Model.findOne({
            where: {
                id
            },
            include: [
                { model: Client },
                { model: Employee }
            ]
        });

        const properties = await Properties.findAll({
            include: [
                { 
                    model: Guarantee,
                    where: {
                        CreditId: id
                    }
                }
            ]
        })

        if(!credit)
            return res
                .status(404)
                .send({ success: false, msg: `${nameModel} not found`});

            res
                .status(200)
                .send({ success: true , result: {credit, properties}, msg: `${nameModel} found with ${id}`});
    } catch (error) {
        res
            .status(400)
            .send({ success: true , msg: `Algo salio mal`});
    }
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

const allowOrDenyCredit = async(req, res) => {

    //try {
    //cambiar status a 'Aprobado'
    const { id } = req.params;
    const { status } = req.body;

    if (req.user.role !== 'Gerente') 
        return res.status(401).json({ msg: 'Denied Role Access' })
    
         const credit = await Model.findByPk(id);
         if (status === 'Aprobado') { 
             //Buscar a bancomex
             const bancomex = await Client.findOne({ where: {
                 firstName: 'Bancomex',
                 email: 'principal@bancomex.com'    

              } });     

              if (!bancomex) 
                 return res.status(404).send({success: false, msg: 'Bancomex no está disponible'});
          
             const accountBanco = await Account.findOne({id: bancomex.id, include: [{model: Card}]});      

             if ( accountBanco.account < req.body.approvedAmount ) 
                 return res.status(404).send({success: false, msg: 'Bancomex no cuenta con los recursos suficientes'});     

          
             const date = new Date();
             req.body.approvalDate = date.toISOString();
             const { approvedAmount, approvalDate } = req.body;     

             //actualizar estado
             const updateStatus = await Model.update ({ 
                 status,
                 approvedAmount,
                 approvalDate
             }, { where: { id } } );    

             //hacer deposito a la primera cuenta de debito
             const accountDebito = await Account.findOne({
                 where: {
                     ClientId: credit.ClientId,
                     type: 'Debito'
                 },
                 include: [
                     { model: Card }
                 ]
              });       

              if (!accountDebito) 
                 return res.status(404).send({success: true, msg: 'El cliente no tiene una cuenta de debito'});


              const total = Number(credit.approvedAmount + accountDebito.amount);
              const deposito = await Account.update({ amount: total }, { where: { id: accountDebito.id } });
              const totalBanco = accountBanco.amount - total;       

              const bancoUpdate = await Account.update({ amount: totalBanco }
                                                       , { where: { id: accountBanco.id } } );
              const dataClient = await Client.findByPk(credit.ClientId);    

             //enviar email avisando que su credito fue aceptado
             console.log('aqui')
             console.log(accountBanco.Cards[0].cardNumber)
             console.log(accountBanco.Cards[0])
             await sendEmailCreditAllow(dataClient, credit.approvedAmount, accountDebito.Cards[0].cardNumber, accountBanco.Cards[0].cardNumber );     

             return res.status(200).send({success: true, 
                                          result: deposito, 
                                          msg: `El credito se ha depositado al cliente ${dataClient.firstName} correctamente!`});
         }      

         //actualizar estado
         const updateStatus = await Model.update ({ 
             status
         }, { where: { id } } );    

         const dataClient = await Client.findByPk(credit.ClientId);
         await sendEmailCreditDenied( dataClient, credit.requestedAmount );

         res.status(200).send({success: true, 
            result: deposito, 
            msg: `El credito solicitado por el cliente ${dataClient.firstName} ha sido rechazado`});

    /*} catch (error) {
        console.log(error)
       res.status(400).send({success: false, msg: 'Algo salio mal...'})
    }*/
    
}

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
const countCredits = async(req, res) => {
    try{
      const result = await Model.count({
        where: {
          status: "Aprobado"
        }
      });
      res.status(200).send({
        success:true,
        result,
        msg: `${nameModel} Total credits found`
      });
    }catch(error){
        res
        .status(404)
        .send({success:false, msg:`${nameModel} wasn't found`})
    }

};

const countCreditEmployee = async (req,res) => {
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
          .send({succes: false, msg:`${nameModel} wasn't found` });
    }
}


module.exports = {
                  findAll, 
                  findOne, 
                  create, 
                  update, 
                  deleteOne, 
                  countCredits, 
                  countCreditEmployee,
                  allowOrDenyCredit,
                  findFilterStatus,
                  findOneJoin
                }