const express = require('express');
const router = express.Router();
const path = 'employees';
const controller = require('../controllers/employees.controller');

router.get( `/${path}`, controller.findAll );
router.get( `/${path}/:id`, controller.findOneById );
router.post( `/${path}`, controller.create);
router.post( `/${path}/login`, controller.login )


module.exports = router;