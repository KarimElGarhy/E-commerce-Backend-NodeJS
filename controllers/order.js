import { dbConnection } from "../db/db.js"

/**********/
export const createOrder = (req,res,next)=>{
    res.status(200).json({message:"Order created", success : true} )
}
/**********/
export const averageOrderValue = (req,res,next) => {
    dbConnection().execute(`SELECT COUNT(*) AS total_orders,
    SUM(total_amount) AS total_order_amount,
    AVG(total_amount) AS average_order_amount
    FROM orders`, (err,result) => {
        if(err){
            res.status(500).send(err.message)
        }
        res.status(200).send(result) 
    })
}
export const userNotMadeAnyOrders = (req,res,next) => {
    dbConnection().execute(`SELECT customer.id AS customer_id,
    customer.first_name,
    customer.last_name 
     FROM customer
     LEFT JOIN orders ON customer.id = orders.customer_id 
     WHERE orders.id is null`, (err,result) => {
        if(err){
            res.status(500).send(err.message)
        }
        res.status(200).send(result) 
    })
}
export const customerMostItems = (req,res,next) => {
    dbConnection().execute(`SELECT customer.id AS customer_id,
    customer.first_name,
    SUM(orders_items.quantity) AS total_items_purchased
FROM customer
JOIN orders ON customer.id = orders.customer_id
JOIN orders_items ON orders.id = orders_items.order_id
GROUP BY customer.id
ORDER BY total_items_purchased DESC LIMIT 1`, (err,result) => {
        if(err){
            res.status(500).send(err.message)
        }
        res.status(200).send(result) 
    })
}

export const mostTenCustomerSpendMoney = (req, res, next) => {
    dbConnection().execute(`SELECT  customer.first_name , SUM(orders.total_amount) AS total_spend   from orders JOIN customer ON orders.customer_id = customer.id GROUP by orders.customer_id  
    ORDER BY SUM(orders.total_amount) ASC;`,(err,result)=>{
        if(err){
            res.status(500).send(err.message)
        }
        res.status(200).json({success : true, result})
    })
}

export const customerOrderMoreThanFiveOrders = (req, res, next) => {
    dbConnection().execute(`SELECT COUNT(orders.customer_id) AS total_order , customer.first_name
    FROM orders
    JOIN customer 
    ON orders.customer_id = customer.id
    GROUP BY orders.customer_id
    HAVING COUNT(orders.customer_id) > 1;`,(err,result)=>{
        if(err){
            res.status(500).send(err.message)
        }
        res.status(200).json({success : true, result})
    })
}
/**********/
export const multipleOrdersPercentage =  (req, res, next) => {

};
/**********/

export const customerMadeEarliestOrder = (req,res,next)=>{
    dbConnection().execute(`SELECT orders.orders_date , customer.first_name FROM orders JOIN customer ON customer.id = orders.customer_id ORDER BY orders_date LIMIT 1;`,(err,result)=>{
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).json({success : true, result})
    })
}

