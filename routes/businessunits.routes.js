const express = require('express');
const router = express.Router();
const path = 'businessunits';
const controller = require('../controllers/businessunits.controller');

// CRUD  Routes

// Route: findOne
router.get(`/${path}/:id`, controller.findOne)
// Route: findAll
router.get(`/${path}`, controller.findAll)
// Route: create
router.post(`/${path}`, controller.create)
// Route: update
router.put(`/${path}/:id`, controller.update)
// Route: deleteOne
router.delete(`/${path}/:id`, controller.deleteOne)


module.exports = router;