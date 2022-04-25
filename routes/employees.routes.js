const express = require('express');
const router = express.Router();
const path = 'employees';
const controller = require('../controllers/employees.controller');
const { verifyToken } = require('../common/functions/authorization');

router.get( `/${path}`, verifyToken ,controller.findAll );
router.get( `/${path}/:id`, verifyToken, controller.findOneById );
router.post( `/${path}`, verifyToken, controller.create);
router.post( `/${path}/login`, controller.login )
router.put(`/${path}/:id`, verifyToken, controller.update)


module.exports = router;