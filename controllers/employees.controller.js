const bcrypt = require('bcryptjs');
const Model = require('../models').Employee
const nameModel = 'Employee';
const saltBcrypt = 10;

const { createToken } = require('../common/functions/authorization');

const findAll = async (req, res) => {
     const result = await Model.findAll();
     console.log(req.user)
     if (!result)
       return res
         .status(404)
         .send({ success: false, msg: `${nameModel} not found` });
     res
       .status(200)
       .send({ success: true, result, msg: `${nameModel} found All` });
}

const findOneById = async (req, res) => {
     const { id } = req.params;

     const result = await Model.findAll({
          where: {
               id
          }
     });

     if (!result)
       return res
         .status(404)
         .send({ success: false, msg: `${nameModel} not found with id - ${id}` });
     res
       .status(200)
       .send({ success: true, result, msg: `${nameModel} found with id - ${id}` });
}

const create = async (req, res) => {
     try {
          const { role } = req.body;
          //CREATE CODE
          const allEmployees = await Model.findAll();
          let newId = '';
          if(allEmployees.length > 0) {
               const lastNumber = allEmployees.length;
               const lastEmployee = allEmployees[lastNumber - 1];
               newId = `${role.substr(0, 1)}${(( lastEmployee.id + 1 ) + 1000)}`;
          
          } else {
               newId = `${role.substr(0, 1)}${1001}`;
          }
          
          //Encrypt the password
          req.body.password = newId;
          const passEncrypted = await bcrypt.hash( req.body.password, saltBcrypt);

          //SET VALUES
          req.body.code = newId;
          req.body.status = 'activo';
          req.body.password = passEncrypted;

          req.body.businessUnitId = Number(req.body.businessUnitId);
          const result = await Model.create({...req.body});

          res.status(201).send({success: true, result ,msg: `${nameModel} was created!`});

     } catch (error) {
          res.status(400).send({success: false, msg: `${nameModel} was not created`, error});
     }
     
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

const login = async (req, res) => {
     const { code, password } = req.body;

     const employee = await Model.findAll({
          where: {
               code
          }
     });

     if( employee.length === 0 ) 
          return res.status(404).send({success: false, msg: `${nameModel} not found`});

     //COMPARE PASSWORDS
     const employeeCorrect = await bcrypt.compare( password, employee[0].password );

     if ( !employeeCorrect ) 
          return res.status(404).send({success: false, msg: `Credentials are incorrect`});

     //SEND USER AND TOKEN
     const token = await createToken( employee[0].id, employee[0].role, true );

     res.status(200).send({success: true, result: employee ,msg: `${nameModel} found`, token})
}

const changePassword = async (req, res) => {
     
     try {
          const { id, role } = req.user;

          if (role !== 'Empleado') 
               return res.status(401).json({ msg: 'Denied Role Access' }) 

          const { password } = req.body;
          //Encrypt the password
          const passEncrypted = await bcrypt.hash(password, saltBcrypt);

          const result = await Model.update( { password: passEncrypted }, { where: id } );
          res.status(200).send({
               success: true,
               result,
               msg: `Password ${result.firstName} was updated successfully`,
             });
     } catch (error) {
          res
               .status(404)
               .send({ success: false, msg: `Password ${nameModel} wasn't updated`, error });
     }
}

module.exports = {
     findAll,
     findOneById,
     create,
     login,
     update,
     changePassword
}