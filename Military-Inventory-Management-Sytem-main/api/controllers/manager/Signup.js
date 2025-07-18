import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import { db2 } from '../../database.js'; // Assuming this is an ES Module import
import cors from "cors"

const app = express();
const port = 3000;

// Middleware
app.use(cors())
app.use(bodyParser.json());

// Connect to the database
// db2.connect(err => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the database');
// });

const Signup = (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  // Extract the first two letters for type validation
  const userPrefix = username.slice(0, 2);
  const userTypeMap = {
    'IM': 'manager',
    'AO': 'admin',
    'BC': 'battalion_commander',
    'SP': 'supplier',
  };

  // Check if the user type matches the username prefix
  const expectedType = userTypeMap[userPrefix];
  if (!expectedType) {
    return res.status(400).json({ error: 'Invalid username prefix' });
  }

  // Validate the password format
  const passwordRegex = /^MIMS-[A-Z]{2}-\d{3}$/; // Format: MIMS-XX-###
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: 'Invalid password format. Use MIMS-XX-###.' });
  }

  // Check if the username already exists
  const queryCheckUser = 'SELECT * FROM LOGIN WHERE username = ?';
  db2.query(queryCheckUser, [username], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (results.length > 0) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Directly insert the user into the database without hashing the password
    const queryInsertUser = 'INSERT INTO LOGIN (username, password, type) VALUES (?, ?, ?)';
    db2.query(queryInsertUser, [username, password, expectedType], (error) => {
      if (error) {
        return res.status(500).json({ error: 'Database error' });
      }

      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

export default Signup;
