import {db} from "../../database.js";
import useParams from "react-router-dom"

function getProducts(req,res){
    const query = "SELECT Product_Id, Product_Name FROM Products";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send("Error fetching products.");
        }
        return res.status(200).json(results);
    });
}

function getAllocatedResource(req, res){
    const {battalionId,productId} = req.params
    const query = `
        SELECT Allocated_Quantity 
        FROM Allocation 
        WHERE Battalion_Id = ? AND Product_Id = ?
    `;
    db.query(query, [battalionId, productId], (err, results) => {
        if (err) {
            console.log("error in fetching data",err)
            return res.status(500).send("Error fetching allocation data.",err);
        }
        if (results.length === 0) {
            return res.status(404).send("No allocation found for this battalion and product.");
        }
        res.status(200).json(results[0]);
    });
}

function order(req,res){
    const { Battalion_Id, Product_Id, Requested_Quantity, Request_Date } = req.body;

    // Query to get the allocated quantity for the given battalion and product
    const query = `
        SELECT Allocated_Quantity 
        FROM Allocation 
        WHERE Battalion_Id = ? AND Product_Id = ?
    `;

    db.query(query, [Battalion_Id, Product_Id], (err, results) => {
        if (err) {
            console.error("Error fetching allocation data:", err);
            return res.status(500).send("Error fetching allocation data.");
        }

        if (results.length === 0) {
            return res.status(404).send("No allocation record found for this battalion and product.");
        }

        const allocatedQuantity = results[0].Allocated_Quantity;

        // Check if requested quantity exceeds allocated quantity
        if (Requested_Quantity > allocatedQuantity) {
            return res.status(400).send(`Requested quantity exceeds the available allocated quantity. Available: ${allocatedQuantity}`);
        }

        // If everything is valid, insert the request into Temporary_Request_Table
        const insertQuery = `
            INSERT INTO Temporary_Request_Table (Request_Id, Battalion_Id, Product_Id, Requested_Quantity, Request_Date) 
            VALUES (UUID(), ?, ?, ?, ?)
        `;

        db.query(insertQuery, [Battalion_Id, Product_Id, Requested_Quantity, Request_Date], (insertErr, insertResults) => {
            if (insertErr) {
                console.error("Error inserting request:", insertErr);
                return res.status(500).send("Error adding request.");
            }

            return res.status(201).send({ message: "Request added successfully.", productName: results[0].Product_Name });
        });
    });
}

export {    
    getAllocatedResource,
    getProducts,
    order
}