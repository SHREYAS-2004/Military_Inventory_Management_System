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
    const allocation = [
        ['ALID_1', 'BID_1', 'PID_1', 100],
        ['ALID_2', 'BID_1', 'PID_2', 200],
        ['ALID_3', 'BID_1', 'PID_3', 150],
        ['ALID_4', 'BID_2', 'PID_1', 250],
        ['ALID_5', 'BID_2', 'PID_4', 175],
        ['ALID_6', 'BID_3', 'PID_2', 300],
        ['ALID_7', 'BID_3', 'PID_5', 125],
        ['ALID_8', 'BID_4', 'PID_3', 180],
        ['ALID_9', 'BID_4', 'PID_6', 90],
        ['ALID_10', 'BID_5', 'PID_4', 220],
        ['ALID_11', 'BID_5', 'PID_7', 60],
        ['ALID_12', 'BID_6', 'PID_5', 145],
        ['ALID_13', 'BID_6', 'PID_8', 110],
        ['ALID_14', 'BID_7', 'PID_6', 200],
        ['ALID_15', 'BID_7', 'PID_9', 130],
        ['ALID_16', 'BID_8', 'PID_7', 175],
        ['ALID_17', 'BID_8', 'PID_10', 90],
        ['ALID_18', 'BID_9', 'PID_8', 250],
        ['ALID_19', 'BID_9', 'PID_1', 125],
        ['ALID_20', 'BID_10', 'PID_2', 200],
        ['ALID_21', 'BID_1', 'PID_9', 140],
        ['ALID_22', 'BID_2', 'PID_10', 210],
        ['ALID_23', 'BID_3', 'PID_1', 160],
        ['ALID_24', 'BID_4', 'PID_2', 100],
        ['ALID_25', 'BID_5', 'PID_5', 195],
        ['ALID_26', 'BID_6', 'PID_3', 80],
        ['ALID_27', 'BID_7', 'PID_4', 225],
        ['ALID_28', 'BID_8', 'PID_5', 175],
        ['ALID_29', 'BID_9', 'PID_6', 150],
        ['ALID_30', 'BID_10', 'PID_7', 220],
        ['ALID_31', 'BID_1', 'PID_8', 170],
        ['ALID_32', 'BID_2', 'PID_9', 110],
        ['ALID_33', 'BID_3', 'PID_10', 140],
        ['ALID_34', 'BID_4', 'PID_1', 90],
        ['ALID_35', 'BID_5', 'PID_2', 260],
        ['ALID_36', 'BID_6', 'PID_3', 130],
        ['ALID_37', 'BID_7', 'PID_4', 180],
        ['ALID_38', 'BID_8', 'PID_5', 210],
        ['ALID_39', 'BID_9', 'PID_6', 150],
        ['ALID_40', 'BID_10', 'PID_7', 200],
        ['ALID_41', 'BID_1', 'PID_8', 100],
        ['ALID_42', 'BID_2', 'PID_9', 150],
        ['ALID_43', 'BID_3', 'PID_10', 170],
        ['ALID_44', 'BID_4', 'PID_1', 180],
        ['ALID_45', 'BID_5', 'PID_2', 90],
        ['ALID_46', 'BID_6', 'PID_3', 130],
        ['ALID_47', 'BID_7', 'PID_4', 110],
        ['ALID_48', 'BID_8', 'PID_5', 220],
        ['ALID_49', 'BID_9', 'PID_6', 140],
        ['ALID_50', 'BID_10', 'PID_7', 175],
        ['ALID_51', 'BID_1', 'PID_8', 200],
        ['ALID_52', 'BID_2', 'PID_9', 150],
        ['ALID_53', 'BID_3', 'PID_10', 130],
        ['ALID_54', 'BID_4', 'PID_1', 90],
        ['ALID_55', 'BID_5', 'PID_2', 110],
        ['ALID_56', 'BID_6', 'PID_3', 170],
        ['ALID_57', 'BID_7', 'PID_4', 100],
        ['ALID_58', 'BID_8', 'PID_5', 180],
        ['ALID_59', 'BID_9', 'PID_6', 125],
        ['ALID_60', 'BID_10', 'PID_7', 140],
        ['ALID_61', 'BID_1', 'PID_8', 190],
        ['ALID_62', 'BID_2', 'PID_9', 160],
        ['ALID_63', 'BID_3', 'PID_10', 135],
        ['ALID_64', 'BID_4', 'PID_1', 175],
        ['ALID_65', 'BID_5', 'PID_2', 110],
        ['ALID_66', 'BID_6', 'PID_3', 120],
        ['ALID_67', 'BID_7', 'PID_4', 150],
        ['ALID_68', 'BID_8', 'PID_5', 200],
        ['ALID_69', 'BID_9', 'PID_6', 130],
        ['ALID_70', 'BID_10', 'PID_7', 190],
        ['ALID_71', 'BID_1', 'PID_8', 80],
        ['ALID_72', 'BID_2', 'PID_9', 210],
        ['ALID_73', 'BID_3', 'PID_10', 125],
        ['ALID_74', 'BID_4', 'PID_1', 190],
        ['ALID_75', 'BID_5', 'PID_2', 165],
        ['ALID_76', 'BID_6', 'PID_3', 140],
        ['ALID_77', 'BID_7', 'PID_4', 200],
        ['ALID_78', 'BID_8', 'PID_5', 100],
        ['ALID_79', 'BID_9', 'PID_6', 150],
        ['ALID_80', 'BID_10', 'PID_7', 160],
        ['ALID_81', 'BID_1', 'PID_8', 170],
        ['ALID_82', 'BID_2', 'PID_9', 130],
        ['ALID_83', 'BID_3', 'PID_10', 140],
        ['ALID_84', 'BID_4', 'PID_1', 80],
        ['ALID_85', 'BID_5', 'PID_2', 90],
        ['ALID_86', 'BID_6', 'PID_3', 210],
        ['ALID_87', 'BID_7', 'PID_4', 180],
        ['ALID_88', 'BID_8', 'PID_5', 175],
        ['ALID_89', 'BID_9', 'PID_6', 200],
        ['ALID_90', 'BID_10', 'PID_7', 100],
        ['ALID_91', 'BID_1', 'PID_8', 150],
        ['ALID_92', 'BID_2', 'PID_9', 120],
        ['ALID_93', 'BID_3', 'PID_10', 100],
        ['ALID_94', 'BID_4', 'PID_1', 130],
        ['ALID_95', 'BID_5', 'PID_2', 150],
        ['ALID_96', 'BID_6', 'PID_3', 170],
        ['ALID_97', 'BID_7', 'PID_4', 110],
        ['ALID_98', 'BID_8', 'PID_5', 190],
        ['ALID_99', 'BID_9', 'PID_6', 160],
        ['ALID_100', 'BID_10', 'PID_7', 150],
        ['ALID_101', 'BID_1', 'PID_8', 125],
        ['ALID_102', 'BID_2', 'PID_9', 135],
        ['ALID_103', 'BID_3', 'PID_10', 180],
        ['ALID_104', 'BID_4', 'PID_1', 200],
        ['ALID_105', 'BID_5', 'PID_2', 160],
        ['ALID_106', 'BID_6', 'PID_3', 140],
        ['ALID_107', 'BID_7', 'PID_4', 180],
        ['ALID_108', 'BID_8', 'PID_5', 200],
        ['ALID_109', 'BID_9', 'PID_6', 170],
        ['ALID_110', 'BID_10', 'PID_7', 190],
        ['ALID_111', 'BID_1', 'PID_8', 110],
        ['ALID_112', 'BID_2', 'PID_9', 120],
        ['ALID_113', 'BID_3', 'PID_10', 140],
        ['ALID_114', 'BID_4', 'PID_1', 130],
        ['ALID_115', 'BID_5', 'PID_2', 150],
        ['ALID_116', 'BID_6', 'PID_3', 160],
        ['ALID_117', 'BID_7', 'PID_4', 170],
        ['ALID_118', 'BID_8', 'PID_5', 180],
        ['ALID_119', 'BID_9', 'PID_6', 190],
        ['ALID_120', 'BID_10', 'PID_7', 100],
        ['ALID_121', 'BID_1', 'PID_8', 125],
        ['ALID_122', 'BID_2', 'PID_9', 135],
        ['ALID_123', 'BID_3', 'PID_10', 145],
        ['ALID_124', 'BID_4', 'PID_1', 155],
        ['ALID_125', 'BID_5', 'PID_2', 165],
        ['ALID_126', 'BID_6', 'PID_3', 175],
        ['ALID_127', 'BID_7', 'PID_4', 185],
        ['ALID_128', 'BID_8', 'PID_5', 195],
        ['ALID_129', 'BID_9', 'PID_6', 200],
        ['ALID_130', 'BID_10', 'PID_7', 205],
        ['ALID_131', 'BID_1', 'PID_8', 215],
        ['ALID_132', 'BID_2', 'PID_9', 225],
        ['ALID_133', 'BID_3', 'PID_10', 235],
        ['ALID_134', 'BID_4', 'PID_1', 245],
        ['ALID_135', 'BID_5', 'PID_2', 255],
        ['ALID_136', 'BID_6', 'PID_3', 265],
        ['ALID_137', 'BID_7', 'PID_4', 275],
        ['ALID_138', 'BID_8', 'PID_5', 285],
        ['ALID_139', 'BID_9', 'PID_6', 295],
        ['ALID_140', 'BID_10', 'PID_7', 305],
        ['ALID_141', 'BID_1', 'PID_8', 315],
        ['ALID_142', 'BID_2', 'PID_9', 325],
        ['ALID_143', 'BID_3', 'PID_10', 335],
        ['ALID_144', 'BID_4', 'PID_1', 345],
        ['ALID_145', 'BID_5', 'PID_2', 355],
        ['ALID_146', 'BID_6', 'PID_3', 365],
        ['ALID_147', 'BID_7', 'PID_4', 375],
        ['ALID_148', 'BID_8', 'PID_5', 385],
        ['ALID_149', 'BID_9', 'PID_6', 395],
        ['ALID_150', 'BID_10', 'PID_7', 405]
    ]; 
    
    
      
        
    

    // Construct the insert query for multiple rows
    const query = `
        INSERT INTO Allocation (Allocation_Id, Battalion_Id, Product_Id, Allocated_Quantity) VALUES ?;`;

    // Execute the batch insert
    db2.query(query, [allocation], (error, results) => {
        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log(`Allocation added successfully: ${results.affectedRows} rows inserted.`);
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
