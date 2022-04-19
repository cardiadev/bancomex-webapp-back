
const express = require('express');
const router = express.Router();
const path = 'beneficiaries';
const controller = require('../controllers/beneficiaries.controller'); 

// CRUD  Routes

// Route: findByPk
router.get(`/${path}/:id`, controller.findByPk)
// Route: findAll
router.get(`/${path}`, controller.findAll)
// Route: create
router.post(`/${path}`, controller.create)
// Route: update
router.put(`/${path}/:id`, controller.update)


module.exports = router;
 