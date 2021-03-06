
const express = require('express');
const router = express.Router();
const path = 'properties';
const controller = require('../controllers/properties.controller'); 
const { verifyToken } = require('../common/functions/authorization');
const { uploadFile } = require('../common/multer/multer');
// CRUD  Routes

// Route: findByPk
router.get(`/${path}/:id`, verifyToken, controller.findByPk)
// Route: findAll
router.get(`/${path}`, verifyToken, controller.findAll)
// Route: create
router.post(`/${path}`, verifyToken, uploadFile, controller.create)
// Route: update
router.put(`/${path}/:id`, verifyToken, controller.update)


module.exports = router;
 