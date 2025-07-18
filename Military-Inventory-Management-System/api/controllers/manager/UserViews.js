import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';  // CORS for cross-origin requests
import {db} from "../../database.js"

const app = express();
const port = 3000;

// Use CORS to allow frontend (on different port) to access backend
app.use(cors());  // This allows all domains by default

// Middleware to parse JSON requests
app.use(bodyParser.json());



const getBattaliondetails = (req, res) => {
  const query = 'SELECT * FROM Battalion';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching battalions from database:', err);
      return res.status(500).json({ error: 'Error fetching battalions' });
    }

    res.status(200).json(results);  // Send back the battalions as a JSON array
  });
}

const getProductdetails = (req, res) => {
  const query = 'SELECT * FROM Products';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products from database:', err);
      return res.status(500).json({ error: 'Error fetching products' });
    }

    res.status(200).json(results);  // Send back the products as a JSON array
  });
}

const getSupplierdetails = (req,res) => {
  const query = 'SELECT * FROM Supplier'

  db.query(query,(err,results) => {
    if (err) {
      console.error('Error fetching products from database:', err);
      return res.status(500).json({ error: 'Error fetching products' });
    }

    res.status(200).json(results); 
  })
} 

export {
  getBattaliondetails,
  getProductdetails,
  getSupplierdetails
}
