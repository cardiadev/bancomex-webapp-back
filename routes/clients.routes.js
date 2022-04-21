const express = require('express');
const router = express.Router();
const path = 'client';
const controller = require('../controllers/clients.controller');
const { verifyToken } = require('../common/functions/authorization');

//CRUD Routes

//Route: findOne
router.get(`/${path}/:id`, verifyToken, controller.findOne)

//Route: FindAll
router.get(`/${path}`, verifyToken,controller.findAll)

//Route: create
router.post(`/${path}`, verifyToken ,controller.create)

//Route: update
router.put(`/${path}/:id`, verifyToken, controller.update)

//Route:deleteOne
router.delete(`/${path}/:id`, verifyToken,controller.deleteOne)

module.exports = router;