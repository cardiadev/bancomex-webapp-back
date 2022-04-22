const express = require('express');
const router = express.Router();
const path = 'cashcutoff';
const controller = require('../controllers/cashcutoff.controller');
const { verifyToken } = require('../common/functions/authorization');

// CRUD  Routes

// Route: findOne
router.get(`/${path}/:id`, verifyToken, controller.findOne)
router.get(`/${path}/getAllInfo/:id`, controller.getAllInfoOf)
// Route: findAll
router.get(`/${path}`, verifyToken, controller.findAll)
// Route: create
router.post(`/${path}`, verifyToken, controller.create)
// Route: update
router.put(`/${path}/:id`, verifyToken, controller.update)
// Route: deleteOne
router.delete(`/${path}/:id`, verifyToken, controller.deleteOne)


module.exports = router;