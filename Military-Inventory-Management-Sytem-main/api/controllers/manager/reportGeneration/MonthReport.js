import { db } from "../../../database.js"; // Assuming you have already set up database connection
import { format, startOfMonth, endOfMonth } from 'date-fns';  // Helper functions

// Function to generate a view for OrderDetails for a specific month
function generateOrderDetailsViewForMonth(req, res) {
    const { year, month } = req.body;  // Get year and month from frontend (e.g., 2023, 08 for August)

    if (!year || !month) {
        return res.status(400).send("Year and month are required.");
    }

    // Format the start and end dates of the month
    const startDate = new Date(year, month - 1, 1);  // Month is 0-based (e.g., 8 for September)
    const endDate = endOfMonth(startDate);  // Get the last day of the month
    
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    // Generate a dynamic view name based on the month (e.g., OrderDetails_View_202308)
    const viewName = `OrderDetails_View_${year}${month.toString().padStart(2, '0')}`;

    // SQL query to create the view dynamically for the selected month
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
            od.Order_Due_Date BETWEEN ? AND ?;
    `;

    // Query to create the view in the database
    db.query(createViewQuery, [formattedStartDate, formattedEndDate], (err, results) => {
        if (err) {
            console.log("Error creating view:", err);
            return res.status(500).send("Error creating view for the specified month.");
        }

        // Now insert the view metadata into the GeneratedViews table
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
                message: `View for the month ${formattedStartDate} to ${formattedEndDate} created and stored into GeneratedViews table successfully.`,
                viewName: viewName
            });
        });
    });
}

// Function to retrieve the data from the generated view
function getOrderDetailsViewData(req, res) {
    const { viewName } = req.params;

    // SQL query to select data from the generated view
    const fetchViewDataQuery = `SELECT * FROM ${viewName};`;

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

export { generateOrderDetailsViewForMonth, getOrderDetailsViewData };