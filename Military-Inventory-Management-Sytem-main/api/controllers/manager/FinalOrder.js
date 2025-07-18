import { db } from "../../database.js";

function FinalOrder(req,res) {
    const fetchDataQuery = `
        SELECT 
            \`to\`.Aggregated_Id, 
            \`to\`.Product_Id, 
            \`to\`.Total_Requested_Quantity, 
            \`to\`.Best_Supplier
        FROM 
            Temporary_Order \`to\`
    `;

    db.query(fetchDataQuery, (err, results) => {
        if (err) {
            console.error('Error fetching data from Temporary_Order:', err);
            db.end();  // Ensure connection is closed on error
            return res.status(500).json("error fetching data");
        }

        console.log('Fetched data:', results);

        // Prepare and insert data into OrderDetails table
        results.forEach(order => {
            const fetchPriceQuery = `
                SELECT Price 
                FROM Supplier_Product 
                WHERE Product_Id = ? AND Supplier_Id = ?
            `;

            db.query(fetchPriceQuery, [order.Product_Id, order.Best_Supplier], (priceErr, priceResults) => {
                if (priceErr) {
                    console.error('Error fetching price from Supplier_Product:', priceErr);
                    return;
                }

                if (priceResults.length === 0) {
                    console.error('No price found for Product_Id:', order.Product_Id, 'from Supplier_Id:', order.Best_Supplier);
                    return res.status(500).json('No price found for Product_Id:', order.Product_Id, 'from Supplier_Id:', order.Best_Supplier);
                }

                const productPrice = priceResults[0].Price;
                const finalPrice = productPrice * order.Total_Requested_Quantity;

                const insertQuery = `
                    INSERT INTO OrderDetails (Order_Id, Product_Id, Order_Quantity, Price, Supplier_Id, Order_Due_Date)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                
                const orderDetails = [
                    order.Aggregated_Id,       // Order_Id
                    order.Product_Id,          // Product_Id
                    order.Total_Requested_Quantity, // Order_Quantity
                    finalPrice,                // Final Price (Price * Quantity)
                    order.Best_Supplier,       // Supplier_Id (Best_Supplier from Temporary_Order)
                    new Date()                 // Order Due Date (current date)
                ];

                db.query(insertQuery, orderDetails, (insertErr, insertResults) => {
                    if (insertErr) {
                        console.error('Error inserting into OrderDetails:', insertErr);
                        return res.status(500).json("error writing into database")
                    } else {
                        console.log('Order details inserted for Order_Id:', order.Aggregated_Id);
                        return res.status(200).json("Order details inserteed for Order_Id")
                    }
                });
            });
        });
    });
}

export default FinalOrder
