const express = require('express');
const router = express.Router();
const path = 'credit';
const controller = require('../controllers/credit.controller');

//Crud Routes

//Route: findOne
router.get(`/${path}/:id`, controller.findOne)
//Route: findAll
router.get(`/${path}`, controller.findAll)
//Router create
router.post(`/${path}`, controller.create)
//Route: update
router.put(`/${path}/:id`, controller.update)
//Router: deleteOne
router.delete(`/${path}/:id`, controller.deleteOne)

module.exports = router;