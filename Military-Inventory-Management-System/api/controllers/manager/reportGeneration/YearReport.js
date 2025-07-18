import { db } from "../../../database.js";  // Assuming you have already set up database connection
import { format, startOfYear, endOfYear } from 'date-fns';  // Helper functions

// Function to generate a view for OrderDetails for a specific year
function generateOrderDetailsViewForYear(req, res) {
    const { year } = req.body;  // Get year from frontend (e.g., 2023)

    if (!year) {
        return res.status(400).send("Year is required.");
    }

    // Format the start and end dates of the year
    const startDate = new Date(year, 0, 1);  // January 1st of the year
    const endDate = endOfYear(startDate);  // December 31st of the year
    
    const formattedStartDate = format(startDate, 'yyyy-MM-dd');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');

    // Generate a dynamic view name based on the year (e.g., OrderDetails_View_2023)
    const viewName = `OrderDetails_View_${year}`;

    // SQL query to create the view dynamically for the selected year
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
            return res.status(500).send("Error creating view for the specified year.");
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
                message: `View for the year ${year} created and stored into GeneratedViews table successfully.`,
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

export { generateOrderDetailsViewForYear, getOrderDetailsViewData };