Project Name
This project is a backend application that interacts with a database to retrieve information about orders and customers. It includes three functions that can be used to retrieve data about the average order value, customers who have not made any orders, and the customer who has purchased the most items.

Installation
To install this project, follow these steps:

Clone the repository to your local machine.
Install the required dependencies by running npm install.
Set up the database connection by updating the db.js file with your database credentials.
Usage
To use this project, you can call the three functions exported by the orders.js file:

averageOrderValue: This function calculates the total number of orders, the total order amount, and the average order amount for all orders in the database.

userNotMadeAnyOrders: This function retrieves a list of customers who have not made any orders.

customerMostItems: This function retrieves the customer who has purchased the most items, along with the total number of items purchased.

To call these functions, you can use an HTTP client like Postman or curl to make requests to the appropriate endpoints. For example, to call the averageOrderValue function, you can make a GET request to /orders/average-order-value.