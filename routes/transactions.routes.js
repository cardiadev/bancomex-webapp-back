
const express = require('express');
const router = express.Router();
const path = 'transactions';
const controller = require('../controllers/transactions.controller'); 
const { verifyToken } = require('../common/functions/authorization');
// CRUD  Routes

// Route: findByPk
router.get(`/${path}/:id`, verifyToken, controller.findByPk)
// Route: findAll
router.get(`/${path}`, verifyToken, controller.findAll)
// Route: create
router.post(`/${path}`, verifyToken, controller.generate)
// Route: update
router.put(`/${path}/:id`, verifyToken, controller.update)


module.exports = router;
 