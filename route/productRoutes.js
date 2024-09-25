import express from 'express'
import { addProduct, fetchProducts, fetchProductsByCategory, fetchProductsById, fetchUniqueCategories } from '../controller/productController.js'


const router = express.Router()
router.post("/addProducts",addProduct)
router.get("/getProducts",fetchProducts)
router.get("/getProduct/:id",fetchProductsById)
router.get("/getProductsByCategory/:category",fetchProductsByCategory)
router.get("/getUniqueCategories", fetchUniqueCategories); 
export default router