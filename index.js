import express from 'express';
import { PORT } from './config/config.js';
import {dbConnection } from './db/db.js'
import customersRouter from './modules/customers.routes.js';
import productsRouter from './modules/products.routes.js';
import orderRouter from './modules/order.routes.js';

const app = express();

app.use(express.json())

app.use(`/customers`,customersRouter)
app.use(`/products`,productsRouter)
app.use(`/orders`,orderRouter)

dbConnection()

app.listen(PORT,() => {
    console.log('listening on port', PORT);
});


