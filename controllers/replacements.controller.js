const Model = require("../models").Replacement
const nameModel = "Replacements"

//  Endpoint: findAll
const findAll = async (req, res) => {
    const result = await Model.findAll();
    if(!result)
    return res
        .status(404)
        .send({succes: false, msg: `${nameModel} not found` });
    res
        .status(200)
        .send({succes: true, result, msg: `${nameModel} found All`});
}

//Endpoint: findByPk
const findByPk = async (req, res) => {
    const { id } = req.params;
    const result = await Model.findByPk(id);
    if (!result)
        return res
            .status(400)
            .send({ succes: false, msg: `${nameModel} not found `});
    res
        .status(200)
        .send({ succes: true, result, msg: `${nameModel} found with ${id}` });
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

  module.exports = {
    findAll,
    findByPk,
    create,
    update
  }; 
