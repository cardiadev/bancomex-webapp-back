const express = require('express');
const router = express.Router();
const path = 'charges';
const controller = require('../controllers/charges.controller');
const { verifyToken } = require('../common/functions/authorization');

router.get(`/${path}`, verifyToken, controller.findAll);
router.get(`/${path}/:id`, verifyToken, controller.findOne);
router.post(`/${path}`, verifyToken, controller.create);
router.put(`/${path}/:id`, verifyToken, controller.update);

module.exports = router;
