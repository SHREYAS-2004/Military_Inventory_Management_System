import { db } from "../database.js";

// Drop the existing trigger if it exists
const dropTriggerQuery = `DROP TRIGGER IF EXISTS TransferOrderToHistory;`;

// Define the new trigger to create
const createTriggerQuery = `DELIMITER $$
CREATE TRIGGER TransferOrderToHistory
AFTER INSERT ON Order_History
FOR EACH ROW
BEGIN
    DELETE FROM OrderDetails 
    WHERE Order_Id = NEW.Order_Id AND Product_Id = NEW.Product_Id;
END$$

DELIMITER ;
`;

// First, drop the existing trigger (if it exists), then create the new one
db.query(dropTriggerQuery, (err, res) => {
    if (err) {
        console.log("Error while dropping the trigger:", err);
    } else {
        console.log("Existing trigger (if any) dropped successfully.");

        // Now create the new trigger
        db.query(createTriggerQuery, (err, res) => {
            if (err) {
                console.log("Error while creating the trigger:", err);
            } else {
                console.log("New trigger created successfully.",res);
            }
        });
    }
});