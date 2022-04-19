const express = require ('express');
const router = express.Router();
const path ='guarantees';
const controller = require ('../controllers/guarantees.controller');

router.get(`/${path}`, controller.findAll);
router.get(`/${path}/:id`, controller.findOne);
router.post(`/${path}`, controller.create);
router.put(`/${path}/:id`, controller.update);

module.exports = router;
