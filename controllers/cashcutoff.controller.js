const Model = require("../models").CashCutOff;
const CashBox = require("../models").CashBox;
const Employee = require("../models").Employee;
const nameModel = "Cash Cut Off";
const { Op } = require("sequelize");

//  Endpoint: findAll
const findAll = async (req, res) => {
  const result = await Model.findAll();
  if (!result)
    return res
      .status(404)
      .send({ success: false, msg: `${nameModel} not found` });
  res
    .status(200)
    .send({ success: true, result, msg: `${nameModel} found All` });
};

//Endpoint: findOne
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
      .send({ success: false, msg: `${nameModel} not found` });
  res
    .status(200)
    .send({ success: true, result, msg: `${nameModel} found with ${id}` });
};

//  Endpoint: create
const create = async (req, res) => {
  try {
    
    if (req.user.role !== 'Cajero') 
            return res.status(401).json({ success: false, msg: 'Denied Role Access' })
    
        
    req.body.EmployeeId = req.user.id;
    const date = new Date();
    req.body.date = date.toISOString(); 
    const finishDate = new Date(`${req.body.date.split('T')[0]}T23:59:59`)
    console.log(req.body.date)
    //Validate if there is a cashcutoff open
    const ccbo = await Model.findOne({
      where: {
        date: {
            [Op.between]: [req.body.date, finishDate]
        },
        totalEnd: null,
        CashBoxId: req.body.CashBoxId,
        EmployeeId: req.user.id
      }
    });
   console.log(ccbo)
    if ( ccbo ) {
      return res.status(400).send({ success: false, result: ccbo ,msg: `Cash with id ${req.body.CashBoxId} has a open cut off` })
    }

    const result = await Model.create({ ...req.body });
    res.status(201).send({
      success: true,
      result,
      msg: `${nameModel} was created successfully`,
    });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, msg: `${nameModel} wasn't created`, error });
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

// Endpoint: delete
const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Model.destroy({ where: { id } });
    res.status(200).send({
      success: true,
      result,
      msg: `${nameModel} was deleted successfully`,
    });
  } catch (error) {
    res.status(404).send({ success: false, msg: `${nameModel} wasn't deleted` });
  }
};

const getAllInfoOf = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const result = await Model.findOne( {
      where: { id },
      include: [{
        model: CashBox
      }, {
        model: Employee
      }]
    } )

    res.status(200).send({success: true, result,  msg: `${nameModel} was found`});

  } catch (error) {
      res.status(404).send({ success: false, msg: `${nameModel} wasn't found`, error });
  }
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteOne,
  getAllInfoOf
};
