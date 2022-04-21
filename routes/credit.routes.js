const express = require('express');
const router = express.Router();
const path = 'credit';
const controller = require('../controllers/credit.controller');
const { verifyToken } = require('../common/functions/authorization');
//Crud Routes

//Route: findOne
router.get(`/${path}/:id`, verifyToken, controller.findOne)
//Route: findAll
router.get(`/${path}`, verifyToken, controller.findAll)
//Router create
router.post(`/${path}`, verifyToken, controller.create)
//Route: update
router.put(`/${path}/:id`, verifyToken, controller.update)
//Router: deleteOne
router.delete(`/${path}/:id`, verifyToken, controller.deleteOne)

module.exports = router;