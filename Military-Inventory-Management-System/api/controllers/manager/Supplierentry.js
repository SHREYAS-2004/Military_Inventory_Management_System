import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // CORS for cross-origin requests
import { db } from "../../database.js";

const app = express();
const port = 3000;

// Use CORS to allow frontend (on different port) to access backend
app.use(cors()); // This allows all domains by default

// Middleware to parse JSON requests
app.use(bodyParser.json());

const addSupplier = (req, res) => {
  const { supplier_id, supplier_name, supplier_location, supplier_country, representative } = req.body;

  // Input validation
  if (!supplier_id || !supplier_name || !supplier_location || !supplier_country || !representative) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if supplier_id already exists
  const checkQuery = 'SELECT * FROM Supplier WHERE Supplier_Id = ?';
  db.query(checkQuery, [supplier_id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error('Error checking supplier ID:', checkErr);
      return res.status(500).json({ error: 'Error checking supplier ID' });
    }

    if (checkResults.length > 0) {
      // Supplier ID already exists
      return res.status(409).json({ error: 'Supplier ID already exists' });
    }

    // Insert the supplier data into the 'Supplier' table
    const insertQuery = 'INSERT INTO Supplier (Supplier_Id, Supplier_Name, Supplier_Location, Supplier_Country, Representative) VALUES (?, ?, ?, ?, ?)';
    db.query(insertQuery, [supplier_id, supplier_name, supplier_location, supplier_country, representative], (insertErr, insertResults) => {
      if (insertErr) {
        console.error('Error inserting supplier into database:', insertErr);
        return res.status(500).json({ error: 'Error inserting supplier' });
      }

      res.status(200).json({ message: 'Supplier added successfully' });
    });
  });
};

export default addSupplier;
