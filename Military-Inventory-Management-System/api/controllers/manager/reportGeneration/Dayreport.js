import { db } from "../../../database.js";  // Assuming you have already set up the database connection

// Function to generate a view for OrderDetails for a specific day
function generateOrderDetailsViewForDay(req, res) {
    const { date } = req.body;  // Date will be passed in the request body in 'YYYY-MM-DD' format

    if (!date) {
        return res.status(400).send("Date is required.");
    }

    // Generate a dynamic view name based on the current date and time to avoid conflicts
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');  // e.g., "20231112_152300"
    const viewName = `OrderDetails_View_${timestamp}`;

    // SQL query to create the view dynamically for a specific day
    const createViewQuery = `
        CREATE VIEW ${viewName} AS
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
            od.Order_Due_Date = ?;
    `;

    // Query to create the view in the database
    db.query(createViewQuery, [date], (err, results) => {
        if (err) {
            console.log("Error creating view:", err);
            return res.status(500).send("Error creating view for the specified day.");
        }

        // Insert view metadata into GeneratedViews table
        const insertViewQuery = `
            INSERT INTO GeneratedViews (view_name, created_at)
            VALUES (?, NOW());
        `;

        db.query(insertViewQuery, [viewName], (insertErr) => {
            if (insertErr) {
                console.error("Error inserting view into GeneratedViews table:", insertErr);
                return res.status(500).send("Error storing view metadata.");
            }

            // Return success message along with the view name (or ID)
            return res.status(201).send({
                message: `View for ${date} created and stored into GeneratedViews table successfully.`,
                viewName: viewName
            });
        });
    });
}

// Function to retrieve the data from the generated view
function getOrderDetailsViewData(req, res) {
    const { viewName } = req.params;

    // SQL query to select data from the generated view
    const fetchViewDataQuery = `SELECT * FROM ${viewName};`

    db.query(fetchViewDataQuery, (err, results) => {
        if (err) {
            console.log("Error fetching view data:", err);
            return res.status(500).send("Error fetching data from the view.");
        }

        if (results.length === 0) {
            return res.status(404).send("No data found for this view.");
        }

        // Return the results (order details) from the view
        return res.status(200).json(results);
    });
}

export { generateOrderDetailsViewForDay, getOrderDetailsViewData };