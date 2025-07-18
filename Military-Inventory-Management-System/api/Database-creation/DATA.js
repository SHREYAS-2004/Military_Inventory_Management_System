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
    const products = [
            ['PID_1', 'ART001', 'Rocket Artillery Model 1', 'Artillery', 250000.00],
            ['PID_2', 'ART002', 'Self Propelled Artillery Model 1', 'Artillery', 300000.00],
            ['PID_3', 'ART003', 'Towed Artillery Model 1', 'Artillery', 200000.00],
            ['PID_4', 'AMM001', 'FMJ Bullets', 'Ammo', 15000.00],
            ['PID_5', 'AMM002', 'Hollow Point Bullets', 'Ammo', 12000.00],
            ['PID_6', 'AMM003', 'AP Bullets', 'Ammo', 18000.00],
            ['PID_7', 'AMM004', 'Tracer Bullets', 'Ammo', 13000.00],
            ['PID_8', 'AMM005', 'Incendiary Bullets', 'Ammo', 20000.00],
            ['PID_9', 'AMM006', 'Explosive Bullets', 'Ammo', 25000.00],
            ['PID_10', 'AMM007', 'Non-Lethal Bullets', 'Ammo', 10000.00],
            ['PID_11', 'AMM008', 'Special Purpose Ammunition', 'Ammo', 22000.00],
            ['PID_12', 'MIN001', 'Anti-Personnel Mine', 'Mines', 5000.00],
            ['PID_13', 'MIN002', 'Anti-Tank Mine', 'Mines', 15000.00],
            ['PID_14', 'MIN003', 'Improvised Explosive Device', 'Mines', 2000.00],
            ['PID_15', 'MIN004', 'Electronic Mine', 'Mines', 12000.00],
            ['PID_16', 'MIN005', 'Directional Mine', 'Mines', 8000.00],
            ['PID_17', 'SMALL001', 'Handgun Model A', 'Small arms', 35000.00],
            ['PID_18', 'SMALL002', 'Shotgun Model A', 'Small arms', 45000.00],
            ['PID_19', 'SMALL003', 'Submachine Gun Model A', 'Small arms', 55000.00],
            ['PID_20', 'VEH001', 'Armoured Combat Vehicle Model 1', 'Vehicles', 500000.00],
            ['PID_21', 'VEH002', 'Tank Destroyer Model 1', 'Vehicles', 700000.00],
            ['PID_22', 'VEH003', 'Armoured Personnel Carrier Model 1', 'Vehicles', 600000.00],
            ['PID_23', 'VEH004', 'Miscellaneous Vehicle Model 1', 'Vehicles', 200000.00],
            ['PID_24', 'VEH005', 'Field Transport Vehicle Model 1', 'Vehicles', 180000.00],
            ['PID_25', 'RADAR001', 'Surveillance Radar Model 1', 'Radars', 80000.00],
            ['PID_26', 'RADAR002', 'Fire Control Radar Model 1', 'Radars', 90000.00],
            ['PID_27', 'RADAR003', 'Air Defense Radar Model 1', 'Radars', 120000.00],
            ['PID_28', 'AIR001', 'Fighter Aircraft Model 1', 'Aircrafts', 15000000.00],
            ['PID_29', 'AIR002', 'Transport Aircraft Model 1', 'Aircrafts', 20000000.00],
            ['PID_30', 'AIR003', 'Trainer Aircraft Model 1', 'Aircrafts', 12000000.00],
            ['PID_31', 'BOMB001', 'General Purpose Bomb Model 1', 'Bombs', 25000.00],
            ['PID_32', 'BOMB002', 'Precision-Guided Bomb Model 1', 'Bombs', 50000.00],
            ['PID_33', 'BOMB003', 'Cluster Bomb Model 1', 'Bombs', 60000.00],
            ['PID_34', 'BOMB004', 'Fragmentation Bomb Model 1', 'Bombs', 30000.00],
            ['PID_35', 'BOMB005', 'Incendiary Bomb Model 1', 'Bombs', 35000.00],
            ['PID_36', 'ADS001', 'Surface to Air Missile Model 1', 'Air Defence System', 700000.00],
            ['PID_37', 'ADS002', 'Anti-Aircraft Artillery Model 1', 'Air Defence System', 600000.00],
            ['PID_38', 'ADS003', 'Medium-Range Missile System Model 1', 'Air Defence System', 900000.00],
            ['PID_39', 'ADS004', 'Long-Range Missile System Model 1', 'Air Defence System', 1200000.00],
            ['PID_40', 'ART004', 'Rocket Artillery Model 2', 'Artillery', 260000.00],
            ['PID_41', 'ART005', 'Self Propelled Artillery Model 2', 'Artillery', 310000.00],
            ['PID_42', 'ART006', 'Towed Artillery Model 2', 'Artillery', 210000.00],
            ['PID_43', 'AMM009', 'Armor-Piercing Bullets', 'Ammo', 19000.00],
            ['PID_44', 'AMM010', 'Tracer Ammunition', 'Ammo', 14000.00],
            ['PID_45', 'AMM011', 'Incendiary Ammunition', 'Ammo', 22000.00],
            ['PID_46', 'AMM012', 'Explosive Ammunition', 'Ammo', 27000.00],
            ['PID_47', 'AMM013', 'Non-Lethal Ammunition', 'Ammo', 11000.00],
            ['PID_48', 'AMM014', 'Special Purpose Ammunition B', 'Ammo', 23000.00],
            ['PID_49', 'MIN006', 'Improvised Explosive Device Model 2', 'Mines', 2500.00],
            ['PID_50', 'MIN007', 'Electronic Mine Model 2', 'Mines', 13000.00],
            ['PID_51', 'MIN008', 'Directional Mine Model 2', 'Mines', 9000.00],
            ['PID_52', 'SMALL004', 'Handgun Model B', 'Small arms', 36000.00],
            ['PID_53', 'SMALL005', 'Shotgun Model B', 'Small arms', 46000.00],
            ['PID_54', 'SMALL006', 'Submachine Gun Model B', 'Small arms', 57000.00],
            ['PID_55', 'VEH006', 'Armoured Combat Vehicle Model 2', 'Vehicles', 520000.00],
            ['PID_56', 'VEH007', 'Tank Destroyer Model 2', 'Vehicles', 720000.00],
            ['PID_57', 'VEH008', 'Armoured Personnel Carrier Model 2', 'Vehicles', 620000.00],
            ['PID_58', 'VEH009', 'Miscellaneous Vehicle Model 2', 'Vehicles', 210000.00],
            ['PID_59', 'VEH010', 'Field Transport Vehicle Model 2', 'Vehicles', 190000.00],
            ['PID_60', 'RADAR004', 'Surveillance Radar Model 2', 'Radars', 85000.00],
            ['PID_61', 'RADAR005', 'Fire Control Radar Model 2', 'Radars', 95000.00],
            ['PID_62', 'RADAR006', 'Air Defense Radar Model 2', 'Radars', 125000.00],
            ['PID_63', 'AIR004', 'Fighter Aircraft Model 2', 'Aircrafts', 15500000.00],
            ['PID_64', 'AIR005', 'Transport Aircraft Model 2', 'Aircrafts', 20500000.00],
            ['PID_65', 'AIR006', 'Trainer Aircraft Model 2', 'Aircrafts', 12500000.00],
            ['PID_66', 'BOMB006', 'General Purpose Bomb Model 2', 'Bombs', 26000.00],
            ['PID_67', 'BOMB007', 'Precision-Guided Bomb Model 2', 'Bombs', 51000.00],
            ['PID_68', 'BOMB008', 'Cluster Bomb Model 2', 'Bombs', 61000.00],
            ['PID_69', 'BOMB009', 'Fragmentation Bomb Model 2', 'Bombs', 31000.00],
            ['PID_70', 'BOMB010', 'Incendiary Bomb Model 2', 'Bombs', 36000.00],
            ['PID_71', 'ADS005', 'Surface to Air Missile Model 2', 'Air Defence System', 720000.00],
            ['PID_72', 'ADS006', 'Anti-Aircraft Artillery Model 2', 'Air Defence System', 620000.00],
            ['PID_73', 'ADS007', 'Medium-Range Missile System Model 2', 'Air Defence System', 920000.00],
            ['PID_74', 'ADS008', 'Long-Range Missile System Model 2', 'Air Defence System', 1250000.00],
            ['PID_75', 'ART007', 'Rocket Artillery Model 3', 'Artillery', 270000.00],
            ['PID_76', 'ART008', 'Self Propelled Artillery Model 3', 'Artillery', 320000.00],
            ['PID_77', 'ART009', 'Towed Artillery Model 3', 'Artillery', 220000.00],
            ['PID_78', 'AMM015', 'Hollow Point Ammunition', 'Ammo', 16000.00],
            ['PID_79', 'AMM016', 'Explosive Ammunition B', 'Ammo', 23000.00],
            ['PID_80', 'AMM017', 'Non-Lethal Ammunition B', 'Ammo', 12000.00],
            ['PID_81', 'MIN009', 'Anti-Personnel Mine Model 2', 'Mines', 6000.00],
            ['PID_82', 'MIN010', 'Anti-Tank Mine Model 2', 'Mines', 16000.00],
            ['PID_83', 'MIN011', 'Improvised Explosive Device Model 3', 'Mines', 2500.00],
            ['PID_84', 'MIN012', 'Electronic Mine Model 3', 'Mines', 14000.00],
            ['PID_85', 'MIN013', 'Directional Mine Model 3', 'Mines', 9000.00],
            ['PID_86', 'SMALL007', 'Handgun Model C', 'Small arms', 37000.00],
            ['PID_87', 'SMALL008', 'Shotgun Model C', 'Small arms', 47000.00],
            ['PID_88', 'SMALL009', 'Submachine Gun Model C', 'Small arms', 58000.00],
            ['PID_89', 'VEH011', 'Armoured Combat Vehicle Model 3', 'Vehicles', 540000.00],
            ['PID_90', 'VEH012', 'Tank Destroyer Model 3', 'Vehicles', 740000.00],
            ['PID_91', 'VEH013', 'Armoured Personnel Carrier Model 3', 'Vehicles', 640000.00],
            ['PID_92', 'VEH014', 'Miscellaneous Vehicle Model 3', 'Vehicles', 220000.00],
            ['PID_93', 'VEH015', 'Field Transport Vehicle Model 3', 'Vehicles', 200000.00],
            ['PID_94', 'RADAR007', 'Surveillance Radar Model 3', 'Radars', 90000.00],
            ['PID_95', 'RADAR008', 'Fire Control Radar Model 3', 'Radars', 100000.00],
            ['PID_96', 'RADAR009', 'Air Defense Radar Model 3', 'Radars', 130000.00],
            ['PID_97', 'AIR007', 'Fighter Aircraft Model 3', 'Aircrafts', 16000000.00],
            ['PID_98', 'AIR008', 'Transport Aircraft Model 3', 'Aircrafts', 21000000.00],
            ['PID_99', 'AIR009', 'Trainer Aircraft Model 3', 'Aircrafts', 13000000.00],
            ['PID_100', 'BOMB011', 'General Purpose Bomb Model 3', 'Bombs', 27000.00],
            ['PID_101', 'BOMB012', 'Precision-Guided Bomb Model 3', 'Bombs', 52000.00],
            ['PID_102', 'BOMB013', 'Cluster Bomb Model 3', 'Bombs', 62000.00],
            ['PID_103', 'BOMB014', 'Fragmentation Bomb Model 3', 'Bombs', 32000.00],
            ['PID_104', 'BOMB015', 'Incendiary Bomb Model 3', 'Bombs', 37000.00],
            ['PID_105', 'ADS009', 'Surface to Air Missile Model 3', 'Air Defence System', 740000.00],
            ['PID_106', 'ADS010', 'Anti-Aircraft Artillery Model 3', 'Air Defence System', 640000.00],
            ['PID_107', 'ADS011', 'Medium-Range Missile System Model 3', 'Air Defence System', 940000.00],
            ['PID_108', 'ADS012', 'Long-Range Missile System Model 3', 'Air Defence System', 1280000.00],
            ['PID_109', 'ART010', 'Rocket Artillery Model 4', 'Artillery', 280000.00],
            ['PID_110', 'ART011', 'Self Propelled Artillery Model 4', 'Artillery', 330000.00],
            ['PID_111', 'ART012', 'Towed Artillery Model 4', 'Artillery', 230000.00],
            ['PID_112', 'AMM018', 'Armor-Piercing Ammunition', 'Ammo', 20000.00],
            ['PID_113', 'AMM019', 'Tracer Ammunition B', 'Ammo', 15000.00],
            ['PID_114', 'AMM020', 'Incendiary Ammunition B', 'Ammo', 24000.00],
            ['PID_115', 'AMM021', 'Explosive Ammunition C', 'Ammo', 28000.00],
            ['PID_116', 'AMM022', 'Non-Lethal Ammunition C', 'Ammo', 13000.00],
            ['PID_117', 'AMM023', 'Special Purpose Ammunition C', 'Ammo', 24000.00],
            ['PID_118', 'MIN014', 'Anti-Personnel Mine Model 3', 'Mines', 7000.00],
            ['PID_119', 'MIN015', 'Anti-Tank Mine Model 3', 'Mines', 17000.00],
            ['PID_120', 'MIN016', 'Improvised Explosive Device Model 4', 'Mines', 3000.00],
            ['PID_121', 'MIN017', 'Electronic Mine Model 4', 'Mines', 16000.00],
            ['PID_122', 'MIN018', 'Directional Mine Model 4', 'Mines', 10000.00],
            ['PID_123', 'SMALL010', 'Handgun Model D', 'Small arms', 38000.00],
            ['PID_124', 'SMALL011', 'Shotgun Model D', 'Small arms', 48000.00],
            ['PID_125', 'SMALL012', 'Submachine Gun Model D', 'Small arms', 59000.00],
            ['PID_126', 'VEH016', 'Armoured Combat Vehicle Model 4', 'Vehicles', 560000.00],
            ['PID_127', 'VEH017', 'Tank Destroyer Model 4', 'Vehicles', 760000.00],
            ['PID_128', 'VEH018', 'Armoured Personnel Carrier Model 4', 'Vehicles', 640000.00],
            ['PID_129', 'VEH019', 'Miscellaneous Vehicle Model 4', 'Vehicles', 230000.00],
            ['PID_130', 'VEH020', 'Field Transport Vehicle Model 4', 'Vehicles', 210000.00],
            ['PID_131', 'RADAR010', 'Surveillance Radar Model 4', 'Radars', 95000.00],
            ['PID_132', 'RADAR011', 'Fire Control Radar Model 4', 'Radars', 105000.00],
            ['PID_133', 'RADAR012', 'Air Defense Radar Model 4', 'Radars', 135000.00],
            ['PID_134', 'AIR010', 'Fighter Aircraft Model 4', 'Aircrafts', 16500000.00],
            ['PID_135', 'AIR011', 'Transport Aircraft Model 4', 'Aircrafts', 21500000.00],
            ['PID_136', 'AIR012', 'Trainer Aircraft Model 4', 'Aircrafts', 13500000.00],
            ['PID_137', 'BOMB016', 'General Purpose Bomb Model 4', 'Bombs', 28000.00],
            ['PID_138', 'BOMB017', 'Precision-Guided Bomb Model 4', 'Bombs', 53000.00],
            ['PID_139', 'BOMB018', 'Cluster Bomb Model 4', 'Bombs', 63000.00],
            ['PID_140', 'BOMB019', 'Fragmentation Bomb Model 4', 'Bombs', 33000.00],
            ['PID_141', 'BOMB020', 'Incendiary Bomb Model 4', 'Bombs', 38000.00],
            ['PID_142', 'ADS013', 'Surface to Air Missile Model 4', 'Air Defence System', 760000.00],
            ['PID_143', 'ADS014', 'Anti-Aircraft Artillery Model 4', 'Air Defence System', 640000.00],
            ['PID_144', 'ADS015', 'Medium-Range Missile System Model 4', 'Air Defence System', 960000.00],
            ['PID_145', 'ADS016', 'Long-Range Missile System Model 4', 'Air Defence System', 1300000.00],
            ['PID_146', 'ART013', 'Rocket Artillery Model 5', 'Artillery', 290000.00],
            ['PID_147', 'ART014', 'Self Propelled Artillery Model 5', 'Artillery', 340000.00],
            ['PID_148', 'ART015', 'Towed Artillery Model 5', 'Artillery', 240000.00],
            ['PID_149', 'AMM024', 'Armor-Piercing Ammunition B', 'Ammo', 22000.00],
            ['PID_150', 'AMM025', 'Tracer Ammunition C', 'Ammo', 16000.00]
        ];
    

    // Construct the insert query for multiple rows
    const query = `
        INSERT INTO Products (Product_Id, Model_No, Product_Name, Type, Price) 
        VALUES ?;
    `;

    // Execute the batch insert
    db2.query(query, [products], (error, results) => {
        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log(`Products added successfully: ${results.affectedRows} rows inserted.`);
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
