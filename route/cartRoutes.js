import express from 'express'
import { addToCart, getCart, removeFromCart, updateCartItem } from '../controller/cartController.js';
const router = express.Router()
router.post('/add', addToCart);
router.get('/getcartproducts', getCart);
router.delete('/cart/remove/:id', removeFromCart);
router.put('/update/:itemId', updateCartItem);
export default router