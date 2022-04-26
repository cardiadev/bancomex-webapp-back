
const express = require('express');
const router = express.Router();
const path = 'accounts';
const controller = require('../controllers/accounts.controller'); 
const { verifyToken } = require('../common/functions/authorization');

// CRUD  Routes

// Route: findByPk
router.get(`/${path}/:id`, verifyToken, controller.findByPk)
// Route: findAll
router.get(`/${path}`, verifyToken, controller.findAll)
// Route: create
router.post(`/${path}`, verifyToken, controller.create)
// Route: update
router.put(`/${path}/:id`, verifyToken, controller.update)
//Route: Count Accounts
router.get(`/${path}/countAccounts`, verifyToken, controller.countAccounts)
// Route: deposit
router.post(`/${path}/deposit`, verifyToken, controller.deposit)
// Route: findByIdClient
router.get(`/${path}/byClient/:id`, verifyToken, controller.findByClientId)


module.exports = router;
 