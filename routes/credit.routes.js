const express = require('express');
const router = express.Router();
const path = 'credit';
const controller = require('../controllers/credit.controller');
const { verifyToken } = require('../common/functions/authorization');
//Crud Routes

//Route: findOne
router.get(`/${path}/:id`, verifyToken, controller.findOne)
//Route: findAll
router.get(`/${path}`, verifyToken, controller.findAll)
// filter by status
router.get(`/${path}/status/:status`, verifyToken, controller.findFilterStatus)
//find with Join
router.get(`/${path}/creditAll/:id`, /*verifyToken,*/ controller.findOneJoin)
//Router create
router.post(`/${path}`, verifyToken, controller.create)
//Route: update
router.put(`/${path}/:id`, verifyToken, controller.update)
//Router: deleteOne
router.delete(`/${path}/:id`, verifyToken, controller.deleteOne)
//Route: count all
router.get(`/${path}/count/countCredits`, verifyToken, controller.countCredits)
//Route: count credits created by a certain employee
router.get(`/${path}/count/countEmployeesCredits`, verifyToken, controller.countCreditEmployee)

router.post(`/${path}/allowOrDenyCredit/:id`, verifyToken, controller.allowOrDenyCredit )

module.exports = router;