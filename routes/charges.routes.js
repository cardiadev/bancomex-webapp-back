const express = require('express');
const router = express.Router();
const path = 'charges';
const controller = require('../controllers/charges.controller');

router.get(`/${path}`, controller.findAll);
router.get(`/${path}/:id`, controller.findOne);
router.post(`/${path}`, controller.create);
router.put(`/${path}/:id`, controller.update);

module.exports = router;
