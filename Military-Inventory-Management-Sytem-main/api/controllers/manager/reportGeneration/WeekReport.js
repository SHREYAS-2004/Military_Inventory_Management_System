import { db } from "../../../database.js";  // Assuming you have already set up the database connection
import { format } from 'date-fns';  // Helper to format the date to "YYYY-MM-DD"

// Function to generate a view for OrderDetails for a specific week
function generateOrderDetailsViewForWeek(req, res) {
    const { startDate } = req.body;  // Start date for the week in 'YYYY-MM-DD' format

    if (!startDate) {
        return res.status(400).send("Start date is required.");
    }

    // Parse the start date and calculate the end date of the week (7 days later)
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);  // Add 6 days to the start date

    // Format both start and end dates to 'YYYY-MM-DD' for use in the SQL query
    const formattedStartDate = format(start, 'yyyy-MM-dd');
    const formattedEndDate = format(end, 'yyyy-MM-dd');

    // Generate a dynamic view name based on the start and end dates (e.g., OrderDetails_View_YYYYMMDD_YYYYMMDD)
    const viewName = `OrderDetails_View_${formattedStartDate}_${formattedEndDate}`;

    // SQL query to create the view dynamically for a specific week
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
            return res.status(500).send("Error creating view for the specified week.");
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

            // Return success message along with the view name
            return res.status(201).send({
                message: `View for the week ${formattedStartDate} to ${formattedEndDate} created and stored into GeneratedViews table successfully.`,
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

export { generateOrderDetailsViewForWeek, getOrderDetailsViewData };