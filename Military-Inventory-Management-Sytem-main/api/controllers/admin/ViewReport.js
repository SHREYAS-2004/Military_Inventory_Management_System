import { db } from "../../database.js";  // Assuming you have already set up database connection

// Function to list all generated views
function listGeneratedViews(req, res) {
    const query = "SELECT view_name, created_at FROM GeneratedViews ORDER BY created_at DESC";

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send("Error fetching generated views.");
        }
        
        return res.status(200).json(results);
    });
}

// Function to fetch data for a specific view
function getOrderDetailsForView(req, res) {
    const { viewName } = req.params;

    const fetchDataQuery = `SELECT * FROM ${viewName};`;

    db.query(fetchDataQuery, (err, results) => {
        if (err) {
            return res.status(500).send("Error fetching data from the view.");
        }

        if (results.length === 0) {
            return res.status(404).send("No data found for the selected view.");
        }

        return res.status(200).json(results);
    });
}

export { listGeneratedViews, getOrderDetailsForView };
