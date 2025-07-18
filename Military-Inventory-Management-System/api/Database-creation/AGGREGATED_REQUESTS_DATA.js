import mysql, { createConnection } from "mysql2";
import express from 'express';
import { db2 } from "../database.js";

const app = express();
const port = 3000;


// Connect to the database
db2.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');

    // Define the product data as an array of arrays
    const aggrequests = [
        ['AID_1', 'PID_1', 52, '2024-11-01'],
        ['AID_2', 'PID_2', 36, '2024-11-01'],
        ['AID_3', 'PID_3', 57, '2024-11-01'],
        ['AID_4', 'PID_4', 71, '2024-11-01'],
        ['AID_5', 'PID_5', 79, '2024-11-01'],
        ['AID_6', 'PID_6', 59, '2024-11-01'],
        ['AID_7', 'PID_7', 61, '2024-11-01'],
        ['AID_8', 'PID_8', 54, '2024-11-01'],
        ['AID_9', 'PID_9', 53, '2024-11-01'],
        ['AID_10', 'PID_10', 61, '2024-11-01'],
        ['AID_11', 'PID_11', 14, '2024-11-01'],
        ['AID_12', 'PID_12', 9, '2024-11-01'],
        ['AID_13', 'PID_13', 19, '2024-11-01'],
        ['AID_14', 'PID_14', 11, '2024-11-01'],
        ['AID_15', 'PID_15', 7, '2024-11-01'],
        ['AID_16', 'PID_16', 5, '2024-11-01'],
        ['AID_17', 'PID_17', 17, '2024-11-01'],
        ['AID_18', 'PID_18', 24, '2024-11-01'],
        ['AID_19', 'PID_19', 20, '2024-11-01'],
        ['AID_20', 'PID_20', 23, '2024-11-01'],
        ['AID_21', 'PID_21', 15, '2024-11-01'],
        ['AID_22', 'PID_22', 10, '2024-11-01'],
        ['AID_23', 'PID_23', 30, '2024-11-01'],
        ['AID_24', 'PID_24', 12, '2024-11-01'],
        ['AID_25', 'PID_25', 22, '2024-11-01'],
        ['AID_26', 'PID_26', 14, '2024-11-01'],
        ['AID_27', 'PID_27', 21, '2024-11-01'],
        ['AID_28', 'PID_28', 17, '2024-11-01'],
        ['AID_29', 'PID_29', 13, '2024-11-01'],
        ['AID_30', 'PID_30', 19, '2024-11-01'],
        ['AID_31', 'PID_31', 8, '2024-11-01'],
        ['AID_32', 'PID_32', 15, '2024-11-01'],
        ['AID_33', 'PID_33', 20, '2024-11-01'],
        ['AID_34', 'PID_34', 18, '2024-11-01'],
        ['AID_35', 'PID_35', 22, '2024-11-01'],
        ['AID_36', 'PID_36', 9, '2024-11-01'],
        ['AID_37', 'PID_37', 26, '2024-11-01'],
        ['AID_38', 'PID_38', 11, '2024-11-01'],
        ['AID_39', 'PID_39', 21, '2024-11-01'],
        ['AID_40', 'PID_40', 15, '2024-11-01'],
        ['AID_41', 'PID_41', 29, '2024-11-01'],
        ['AID_42', 'PID_42', 12, '2024-11-01'],
        ['AID_43', 'PID_43', 28, '2024-11-01'],
        ['AID_44', 'PID_44', 23, '2024-11-01'],
        ['AID_45', 'PID_45', 10, '2024-11-01'],
        ['AID_46', 'PID_46', 13, '2024-11-01'],
        ['AID_47', 'PID_47', 16, '2024-11-01'],
        ['AID_48', 'PID_48', 14, '2024-11-01'],
        ['AID_49', 'PID_49', 20, '2024-11-01'],
        ['AID_50', 'PID_50', 18, '2024-11-01'],
        ['AID_51', 'PID_51', 10, '2024-11-01'],
        ['AID_52', 'PID_52', 15, '2024-11-01'],
        ['AID_53', 'PID_53', 8, '2024-11-01'],
        ['AID_54', 'PID_54', 20, '2024-11-01'],
        ['AID_55', 'PID_55', 12, '2024-11-01'],
        ['AID_56', 'PID_56', 25, '2024-11-01'],
        ['AID_57', 'PID_57', 18, '2024-11-01'],
        ['AID_58', 'PID_58', 22, '2024-11-01'],
        ['AID_59', 'PID_59', 14, '2024-11-01'],
        ['AID_60', 'PID_60', 16, '2024-11-01'],
        ['AID_61', 'PID_61', 9, '2024-11-01'],
        ['AID_62', 'PID_62', 11, '2024-11-01'],
        ['AID_63', 'PID_63', 19, '2024-11-01'],
        ['AID_64', 'PID_64', 7, '2024-11-01'],
        ['AID_65', 'PID_65', 21, '2024-11-01'],
        ['AID_66', 'PID_66', 30, '2024-11-01'],
        ['AID_67', 'PID_67', 17, '2024-11-01'],
        ['AID_68', 'PID_68', 14, '2024-11-01'],
        ['AID_69', 'PID_69', 12, '2024-11-01'],
        ['AID_70', 'PID_70', 16, '2024-11-01'],
        ['AID_71', 'PID_71', 20, '2024-11-01'],
        ['AID_72', 'PID_72', 15, '2024-11-01'],
        ['AID_73', 'PID_73', 25, '2024-11-01'],
        ['AID_74', 'PID_74', 13, '2024-11-01'],
        ['AID_75', 'PID_75', 18, '2024-11-01'],
        ['AID_76', 'PID_76', 14, '2024-11-01'],
        ['AID_77', 'PID_77', 10, '2024-11-01'],
        ['AID_78', 'PID_78', 16, '2024-11-01'],
        ['AID_79', 'PID_79', 23, '2024-11-01'],
        ['AID_80', 'PID_80', 11, '2024-11-01'],
        ['AID_81', 'PID_81', 27, '2024-11-01'],
        ['AID_82', 'PID_82', 19, '2024-11-01'],
        ['AID_83', 'PID_83', 24, '2024-11-01'],
        ['AID_84', 'PID_84', 12, '2024-11-01'],
        ['AID_85', 'PID_85', 30, '2024-11-01'],
        ['AID_86', 'PID_86', 8, '2024-11-01'],
        ['AID_87', 'PID_87', 13, '2024-11-01'],
        ['AID_88', 'PID_88', 17, '2024-11-01'],
        ['AID_89', 'PID_89', 14, '2024-11-01'],
        ['AID_90', 'PID_90', 22, '2024-11-01'],
        ['AID_91', 'PID_91', 15, '2024-11-01'],
        ['AID_92', 'PID_92', 16, '2024-11-01'],
        ['AID_93', 'PID_93', 18, '2024-11-01'],
        ['AID_94', 'PID_94', 10, '2024-11-01'],
        ['AID_95', 'PID_95', 11, '2024-11-01'],
        ['AID_96', 'PID_96', 9, '2024-11-01'],
        ['AID_97', 'PID_97', 23, '2024-11-01'],
        ['AID_98', 'PID_98', 12, '2024-11-01'],
        ['AID_99', 'PID_99', 14, '2024-11-01'],
        ['AID_100', 'PID_100', 20, '2024-11-01']
    ];

    // Construct the insert query for multiple rows
    const query = `
        INSERT INTO Aggregated_Requests (Aggregated_Id,Product_Id,Total_Requested_Quantity,Aggregation_Date ) VALUES ?;`;

    // Execute the batch insert
    db2.query(query, [aggrequests], (error, results) => {
        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log(`Requests added successfully: ${results.affectedRows} rows inserted.`);
        }

        // Close the connection after the insert operation
        db2.end(err => {
            if (err) {
                console.error('Error closing the connection:', err);
            } else {
                console.log('Connection closed.');
            }
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
