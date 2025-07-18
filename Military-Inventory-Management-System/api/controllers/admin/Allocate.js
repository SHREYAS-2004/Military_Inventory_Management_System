import { db } from "../../database.js";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());

function Allocate(req, res) {
    const { allocationId,battalionId, productId, quantity } = req.body;

    const q = `INSERT INTO Allocation (Allocation_Id,Battalion_Id, Product_Id, Allocated_Quantity) VALUES (?, ?, ?, ?)`;

    db.query(q, [allocationId,battalionId, productId, quantity], (error, result) => {
        if (error) {
            console.log("Error occurred in writing into the database");
            return res.status(500).json("Error in writing to db");
        } else {
            return res.status(200).json("Allocation successful");
        }
    });
}

export default Allocate;
