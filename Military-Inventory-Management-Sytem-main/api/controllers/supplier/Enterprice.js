import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';
import { db } from '../../database.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

function getAllProducts(req, res) {
    const query = "SELECT Product_Id, Product_Name FROM Products";
    db.query(query, (err, results) => {
        if (err) {
            console.log("Error fetching products:", err);
            return res.status(500).send("Error fetching products.");
        }
        return res.status(200).json(results);  // Send the product list to frontend
    });
}

// Function to allow the supplier to enter a price for a product
function enterPrice(req, res) {
    const { Supplier_Id, Product_Id, Price } = req.body;

    console.log("Hi from enterPrice");
    console.log(Supplier_Id, Product_Id, Price);

    // Check if all fields are provided
    if (!Supplier_Id || !Product_Id || !Price) {
        return res.status(400).send("Missing required fields: Supplier_Id, Product_Id, or Price.");
    }

    // Query to check if the supplier exists
    const checkSupplierQuery = `SELECT * FROM Supplier WHERE Supplier_Id = ?`;
    db.query(checkSupplierQuery, [Supplier_Id], (err, supplierResults) => {
        if (err) {
            console.log("Error checking supplier:", err);
            return res.status(500).send("Error checking supplier.");
        }

        // Check if the supplier exists
        if (supplierResults.length === 0) {
            return res.status(404).send("Supplier not found.");
        }

        // Query to check if the product exists
        const checkProductQuery = `SELECT * FROM Products WHERE Product_Id = ?`;
        db.query(checkProductQuery, [Product_Id], (err, productResults) => {
            if (err) {
                console.log("Error checking product:", err);
                return res.status(500).send("Error checking product.");
            }

            // Check if the product exists
            if (productResults.length === 0) {
                return res.status(404).send("Product not found.");
            }

            // Proceed to insert the price into the Supplier_Product table
            const insertQuery = `
                INSERT INTO Supplier_Product (Supplier_Id, Product_Id, Price)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE Price = ?;
            `;

            db.query(insertQuery, [Supplier_Id, Product_Id, Price, Price], (insertErr, insertResults) => {
                if (insertErr) {
                    console.error("Error inserting price:", insertErr);
                    return res.status(500).send("Error adding price.");
                }

                return res.status(201).send({
                    message: "Price successfully entered for product.",
                    Supplier_Id,
                    Product_Id,
                    Price
                });
            });
        });
    });
}


export { 
    getAllProducts,
    enterPrice
};