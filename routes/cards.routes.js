const express = require ('express');
const router = express.Router();
const path = 'cards';
const controller = require ('../controllers/cards.controller');
const { verifyToken } = require('../common/functions/authorization');

router.get(`/${path}`, verifyToken, controller.findAll);
router.get(`/${path}/:id`, verifyToken, controller.findOneByIb);
router.post(`/${path}`, verifyToken, controller.create);
router.put(`/${path}/:id`, verifyToken, controller.update);

// Route: findByCardNumber
router.get(`/${path}/byCardNumber/:cardNumber`, verifyToken, controller.findByCardNumber)

module.exports = router;
