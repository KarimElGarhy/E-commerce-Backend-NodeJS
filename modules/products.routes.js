import { Router } from "express";
import { addProduct, getProducts,totalRevenueByCategory,totalItemsSoldByProduct } from "../controllers/products.js";

const productsRouter = Router()

productsRouter.get("/",getProducts)
productsRouter.get("/categories-revenue",totalRevenueByCategory)
productsRouter.get("/total-products-sale",totalItemsSoldByProduct)
productsRouter.post("/",addProduct)


export default productsRouter;