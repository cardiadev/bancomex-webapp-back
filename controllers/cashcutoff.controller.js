const Model = require("../models").CashCutOff;
const nameModel = "Cash Cut Off";

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
            return res.status(401).json({ msg: 'Denied Role Access' })
            
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

module.exports = {
  findAll,
  findOne,
  create,
  update,
  deleteOne,
};
