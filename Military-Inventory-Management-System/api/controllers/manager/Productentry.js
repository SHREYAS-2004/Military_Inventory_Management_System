import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // For handling CORS if needed
import { db } from "../../database.js";

const app = express();
const port = 3000;

// Enable CORS for all origins (or specify your frontend URL)
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());

const addProduct = (req, res) => {
  const { product_id, model_no, product_name, type, price } = req.body;

  // Input validation
  if (!product_id || !model_no || !product_name || !type || !price) {
    return res.status(400).json({ error: 'All fields (Product ID, Model No, Product Name, Type, Price) are required' });
  }

  // Check if the product already exists
  const checkQuery = `SELECT * FROM Products WHERE Product_Id = ?`;
  
  db.query(checkQuery, [product_id], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking product in database:', checkError);
      return res.status(500).json({ error: 'Failed to check existing product' });
    }

    if (checkResults.length > 0) {
      // Product already exists
      return res.status(409).json({ error: 'Product already exists' });
    }

    // Insert the product into the database if it doesn't exist
    const insertQuery = 'INSERT INTO Products (Product_Id, Model_No, Product_Name, Type, Price) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [product_id, model_no, product_name, type, price], (insertError, insertResults) => {
      if (insertError) {
        console.error('Error inserting product into database:', insertError);
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(200).json({ 
        message: 'Product added successfully', 
        product: { product_id, model_no, product_name, type, price } 
      });
    });
  });
};

// Export the function for use in the application
export default addProduct;

