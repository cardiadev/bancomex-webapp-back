const express = require('express');
const router = express.Router();
const path = 'denominationchascutoff';
const controller = require('../controllers/denominationcash.controller');
const { verifyToken } = require('../common/functions/authorization');
//CRUD Routes

// Route: findOne
router.get(`/${path}/:id`, verifyToken, controller.findOne)
//Route: findAll
router.get(`/${path}`, verifyToken, controller.findAll)
//Route: create
router.post(`/${path}`, verifyToken, controller.create)
//Route: update
router.put(`/${path}/:id`, verifyToken, controller.update)
//Route: deleteOne
router.delete(`/${path}/:id`, verifyToken, controller.deleteOne)

module.exports = router;