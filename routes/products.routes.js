const express = require('express');
const router = express.Router();

const productController = require('../controllers/products.controller')

router.get('/', productController.get);
router.get('/:id', productController.getOne);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

module.exports = router;