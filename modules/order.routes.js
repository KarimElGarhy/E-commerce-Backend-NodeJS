import { Router } from "express";
import { averageOrderValue, customerMostItems, userNotMadeAnyOrders,mostTenCustomerSpendMoney, customerOrderMoreThanFiveOrders, multipleOrdersPercentage, createOrder, customerMadeEarliestOrder } from "../controllers/order.js";


const orderRouter = Router();

orderRouter.get("/average-order-value",averageOrderValue)
.get("/user-not-made-any-orders",userNotMadeAnyOrders)
.get("/user-most-items",customerMostItems)
.get("/top-ten-customers",mostTenCustomerSpendMoney)
.get("/customer-order-more-than-five",customerOrderMoreThanFiveOrders)
.get("/multiple-orders-percentage",multipleOrdersPercentage)
.get("/customer-made-earliest-order",customerMadeEarliestOrder)
.post('/create-order',createOrder)



export default orderRouter