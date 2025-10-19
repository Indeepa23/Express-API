import { createProduct,getAllProduct , updateProduct } from '../controllers/productController.js'
import auth from '../middleware/auth.js';
import express from 'express';

const router = express.Router();

router.get('/', auth, getAllProduct);
router.post('/create', auth, createProduct);
router.post('/:id', auth, updateProduct);


export default router;