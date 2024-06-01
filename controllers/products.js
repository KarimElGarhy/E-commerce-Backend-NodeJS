import { dbConnection } from "../db/db.js"

export const getProducts = (req,res,next) => {
    dbConnection().execute('SELECT products.product_name AS ProductName, products.unit_price AS UnitPrice, category.category_name AS CategoryName FROM products JOIN category ON products.category = category.id ; ', (err,result) => {
        if(err){
            res.status(500).send(err.message)
        }
        res.status(200).send(result) 
    })
}

export const addProduct = (req, res, next) => {
    const { product_name, category_id, unit_price } = req.body;
    if( !product_name,!category_id,!unit_price){
        return res.status(400).json({message : "All fields are required",success : false})
    }
    const sqlInsertProduct = `INSERT INTO products (product_name, category, unit_price) 
    VALUES (?,?,?)` 
    dbConnection().execute(sqlInsertProduct,[product_name, category_id, unit_price], (err, result) => {
        if(err){
            res.status(500).send(err.message)
        }
        res.status(200).json({message : "Product added successfully",success : true,result})
    })
}

export const totalRevenueByCategory = (req, res, next) => {
    dbConnection().execute(`SELECT category.category_name, SUM(orders_items.quantity * orders_items.unit_price) AS total_revenue
    FROM orders_items
    JOIN products ON orders_items.product_id = products.id
    JOIN category ON products.category = category.id
    GROUP BY category.category_name`,(err,result)=>{
        if(err){
            res.status(500).send(err.message)
        }
        res.status(200).json({success : true , result})
    })
}

export const totalItemsSoldByProduct = (req, res, next) => {
    dbConnection().execute(`SELECT products.product_name, COUNT(orders_items.quantity) AS 'total Items Sold' FROM orders_items JOIN products ON orders_items.product_id= products.id GROUP by orders_items.product_id;`,(err,result)=>{
        if(err){
            res.status(500).send(err.message)
        }
        res.status(200).json({success : true, result})
    })
}
