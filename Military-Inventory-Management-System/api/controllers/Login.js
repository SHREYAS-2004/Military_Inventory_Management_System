import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors'; // Import CORS package
import { db2 } from '../database.js';

const app = express();
const port = 3000;

// Use CORS to allow frontend (on different port) to access backend
app.use(cors()); // This allows all domains by default, but you can configure it to allow specific domains

// Middleware
app.use(bodyParser.json());

// Database db2

const Login = (req, res) => {
    const { username, password, type } = req.body;
    

    // Validate input
    if (!username || !password || !type) {
        return res.status(400).json({ error: 'Username, password, and type are required' });
    }

    // Query the database for the user
    const query = 'SELECT * FROM LOGIN WHERE username = ?';
    db2.query(query, [username], (error, results) => {
        if (error) {
            console.log("Database error")
            return res.status(500).json({ error: 'Database error' });

        }

        if (results.length == 0) {
            console.log("Invalid username or password")
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = results[0];

        // Perform plain string comparison (no bcrypt hashing)
        if (password != user.password) {
            console.log("Invalid username or password")
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Check user type
        if (user.type != type) {
            console.log("Invalid user type")
            return res.status(403).json({ error: 'Invalid user type' });
        }

        // Redirect based on user type
        switch (user.type) {
            case 'manager':
                res.status(200).json("login successful");
                break;
            case 'admin':
                res.status(200).json("login successful");
                break;
            case 'battalion_commander':
                res.status(200).json("login successful");
                break;
            case 'supplier':
                res.status(200).json("login successful");
                break;
            default:
                res.status(400).json({ error: 'Unknown user type' });
        }
    });
}

export default Login

