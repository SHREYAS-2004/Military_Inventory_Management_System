import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {db} from "../../database.js"

const app = express();
const port = 3000;

// Use CORS to allow frontend (on different port) to access backend
app.use(cors());
app.use(bodyParser.json()); // Middleware for JSON parsing


const addBattalion = (req, res) => {
  const { battalion_id, name, location, headquarters, colonel, number_of_soldiers } = req.body;

  // Validate input data
  if (!battalion_id || !name || !location || !headquarters || !colonel || !number_of_soldiers) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if the battalion already exists
  const checkQuery = `SELECT * FROM Battalion WHERE Battalion_id = ?`;
  
  db.query(checkQuery, [battalion_id], (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking existing battalion:', checkError);
      return res.status(500).json({ error: 'Failed to check existing battalion' });
    }

    if (checkResults.length > 0) {
      // Battalion already exists
      return res.status(409).json({ error: 'Battalion already exists' });
    }

    // If not exists, insert the battalion data
    const insertQuery = `INSERT INTO Battalion (Battalion_id, Name, Location, Headquarters, Colonel, Number_of_Soldiers) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(insertQuery, [battalion_id, name, location, headquarters, colonel, number_of_soldiers], (insertError, insertResults) => {
      if (insertError) {
        console.error('Error inserting data:', insertError);
        return res.status(500).json({ error: 'Failed to add battalion' });
      }

      return res.status(200).json({ message: 'Battalion added successfully!' });
    });
  });
};


export default addBattalion
