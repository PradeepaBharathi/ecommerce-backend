import express from 'express'
import { addToCart, getCart } from '../controller/cartController.js';
const router = express.Router()
router.post('/add', addToCart);
router.get('/getcartproducts', getCart);

export default router