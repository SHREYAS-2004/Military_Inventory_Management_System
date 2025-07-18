import mysql, { createConnection } from "mysql2";
import express from 'express';
import { db2 } from "../database.js";

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Create a database connection


// Connect to the database
db2.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');

    // Define your schema
    const schemas = [
        `CREATE TABLE Products (
            Product_Id VARCHAR(25) PRIMARY KEY,
            Model_No VARCHAR(50) NOT NULL,
            Product_Name VARCHAR(100) NOT NULL,
            Type VARCHAR(50) NOT NULL,
            Price DECIMAL(10, 2) NOT NULL,
            UNIQUE (Model_No)
        );`,
        `CREATE TABLE Battalion (
            Battalion_Id VARCHAR(25) PRIMARY KEY,
            Name VARCHAR(100) NOT NULL,
            Location VARCHAR(100) NOT NULL,
            Headquarters VARCHAR(100) NOT NULL,
            Colonel VARCHAR(100) NOT NULL,
            Number_of_Soldiers INT NOT NULL
        );`,
        `CREATE TABLE Supplier (
            Supplier_Id VARCHAR(25) PRIMARY KEY,
            Supplier_Name VARCHAR(100) NOT NULL,
            Supplier_Location VARCHAR(100) NOT NULL,
            Supplier_Country VARCHAR(100) NOT NULL,
            Representative VARCHAR(100) NOT NULL
        );`,
        `CREATE TABLE OrderDetails (
            Order_Id VARCHAR(25) PRIMARY KEY,
            Product_Id VARCHAR(25),
            Order_Quantity INT NOT NULL,
            Price DECIMAL(10, 2) NOT NULL,
            Seller_Id VARCHAR(25) NOT NULL,
            Order_Due_Date DATE NOT NULL,
            FOREIGN KEY (Product_Id) REFERENCES Products(Product_Id)
        );`,
        `CREATE TABLE Order_History (
            Order_Id VARCHAR(25) PRIMARY KEY,
            Product_Id VARCHAR(25),
            Order_Quantity INT NOT NULL,
            Price DECIMAL(10, 2) NOT NULL,
            Seller_Id VARCHAR(25) NOT NULL,
            Order_Delivered_Date DATE NOT NULL,
            FOREIGN KEY (Product_Id) REFERENCES Products(Product_Id)
        );`,
        `CREATE TABLE Allocation (
            Allocation_Id VARCHAR(25) PRIMARY KEY,
            Battalion_Id VARCHAR(25),
            Product_Id VARCHAR(25),
            Allocated_Quantity INT NOT NULL,
            FOREIGN KEY (Battalion_Id) REFERENCES Battalion(Battalion_Id),
            FOREIGN KEY (Product_Id) REFERENCES Products(Product_Id)
        );`,
        `CREATE TABLE Supplier_Product (
            Supplier_Id VARCHAR(25),
            Product_Id VARCHAR(25),
            Price DECIMAL(10, 2) NOT NULL,
            PRIMARY KEY (Supplier_Id, Product_Id),
            FOREIGN KEY (Supplier_Id) REFERENCES Supplier(Supplier_Id),
            FOREIGN KEY (Product_Id) REFERENCES Products(Product_Id)
        );`,
        `CREATE TABLE Temporary_Request_Table (
            Request_Id VARCHAR(25) PRIMARY KEY,
            Battalion_Id VARCHAR(25),
            Product_Id VARCHAR(25),
            Requested_Quantity INT NOT NULL CHECK (Requested_Quantity > 0),
            Request_Date DATE NOT NULL,
            FOREIGN KEY (Battalion_Id) REFERENCES Battalion(Battalion_Id),
            FOREIGN KEY (Product_Id) REFERENCES Products(Product_Id)
        );`,
        `CREATE TABLE Aggregated_Requests (
            Aggregated_Id VARCHAR(25) PRIMARY KEY,
            Product_Id VARCHAR(25),
            Total_Requested_Quantity INT NOT NULL,
            Aggregation_Date DATE NOT NULL,
            FOREIGN KEY (Product_Id) REFERENCES Products(Product_Id)
        );`
    ];

    // Execute each schema creation
    let index = 0;
    const executeSchema = () => {
        if (index < schemas.length) {
            db2.query(schemas[index], (error, results) => {
                if (error) {
                    console.error("Some error occurred:", error);
                } else {
                    console.log(`Table created: ${schemas[index].match(/CREATE TABLE (\w+)/)[1]}`);
                }
                index++;
                executeSchema(); // Execute the next schema
            });
        } else {
            // Close the connection once all tables are created
            db2.end(err => {
                if (err) {
                    console.error('Error closing the connection:', err);
                } else {
                    console.log('Connection closed.');
                }
            });
        }
    };

    executeSchema(); // Start executing the schema creation
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
