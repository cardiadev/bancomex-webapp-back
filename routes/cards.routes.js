const express = require ('express');
const router = express.Router();
const path = 'cards';
const controller = require ('../controllers/cards.controller');

router.get(`/${path}`, controller.findAll);
router.get(`/${path}/:id`, controller.findOneByIb);
router.post(`/${path}`, controller.create);
router.put(`/${path}/:id`, controller.update);

module.exports = router;
