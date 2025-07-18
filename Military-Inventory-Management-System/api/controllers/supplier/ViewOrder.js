import { db } from "../../database.js";

function getSupplierOrders(req, res) {
    const { SID } = req.params;  // Extract Supplier_Id from request parameters
    console.log("Hi From backend", SID)

    // Check if Supplier_Id is provided
    if (!SID) {
        return res.status(400).send("Supplier_Id is required.");
    }

    // Query to fetch orders for the specific supplier
    const query = `
        SELECT 
            od.Order_Id, 
            od.Product_Id, 
            p.Product_Name, 
            od.Order_Quantity, 
            od.Price, 
            od.Order_Due_Date
        FROM 
            OrderDetails od
        JOIN 
            Products p ON od.Product_Id = p.Product_Id
        WHERE 
            od.Supplier_Id = ?
    `;

    db.query(query, [SID], (err, results) => {
        if (err) {
            console.log("Error fetching supplier orders:", err);
            return res.status(500).send("Error fetching orders.");
        }

        if (results.length === 0) {
            return res.status(404).send("No orders found for this supplier.");
        }

        // Return the results (orders) to the frontend
        return res.status(200).json(results);
    });
}

function deliverOrdersToHistory(req, res) {
    const { supplierId } = req.body; // Get supplier ID from the frontend

    if (!supplierId) {
        return res.status(400).send("Supplier ID is required.");
    }

    // Step 1: Fetch orders for the given supplier from OrderDetails
    const selectQuery = `
        SELECT Order_Id, Product_Id, Order_Quantity, Price, Supplier_Id
        FROM OrderDetails
        WHERE Supplier_Id = ?;
    `;

    db.query(selectQuery, [supplierId], (err, results) => {
        if (err) {
            console.log("Error fetching orders from OrderDetails:", err);
            return res.status(500).send("Error fetching orders.");
        }

        if (results.length === 0) {
            return res.status(404).send(`No orders found for Supplier ID ${supplierId}.`);
        }

        // Step 2: Insert the fetched orders into Order_History
        const insertQuery = `
            INSERT INTO Order_History (Order_Id, Product_Id, Order_Quantity, Price, Supplier_Id, Order_Delivered_Date)
            VALUES (?, ?, ?, ?, ?, CURDATE());
        `;

        const insertPromises = results.map(order => {
            const { Order_Id, Product_Id, Order_Quantity, Price, Supplier_Id } = order;

            // Execute INSERT query for each order
            return new Promise((resolve, reject) => {
                db.query(insertQuery, [Order_Id, Product_Id, Order_Quantity, Price, Supplier_Id], (err, result) => {
                    if (err) {
                        console.log(`Error inserting order ${Order_Id} into Order_History:`, err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });

        // Wait for all INSERT operations to complete
        Promise.all(insertPromises)
            .then(() => {
                res.status(200).send({
                    message: `Orders for Supplier ID ${supplierId} have been successfully delivered and moved to Order History.`
                });
            })
            .catch(err => {
                console.log("Error during batch insert into Order_History:", err);
                res.status(500).send("Error moving orders to Order History.");
            });
    });
}


export { getSupplierOrders, deliverOrdersToHistory }