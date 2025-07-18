import mysql, { createConnection } from "mysql2";
import express from 'express';
import { db2 } from "../database.js";
const app = express();
const port = 3000;

// Create a database connection


// Connect to the database
db2.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');

    // Define the product data as an array of arrays
    const supplier = [
        ['SID_1', 'Defence Research and Development Organisation', 'Delhi', 'India', 'Dr. Rakesh Gupta'],
        ['SID_2', 'Bharat Electronics Limited', 'Bangalore', 'India', 'Mr. Arvind Kumar'],
        ['SID_3', 'Hindustan Aeronautics Limited', 'Bangalore', 'India', 'Mr. Sunil Mehta'],
        ['SID_4', 'Mahindra Defence Systems', 'Mumbai', 'India', 'Ms. Neha Sharma'],
        ['SID_5', 'Tata Power SED', 'Pune', 'India', 'Mr. Pradeep Joshi'],
        ['SID_6', 'Larsen & Toubro', 'Mumbai', 'India', 'Mr. Rahul Verma'],
        ['SID_7', 'Ordnance Factory Board', 'Kolkata', 'India', 'Mr. Anil Sinha'],
        ['SID_8', 'Ashok Leyland Defence', 'Chennai', 'India', 'Mr. K. Raghavan'],
        ['SID_9', 'BEL Optronics', 'Bangalore', 'India', 'Mr. Pawan Singh'],
        ['SID_10', 'Goa Shipyard Limited', 'Goa', 'India', 'Mr. Vikram Rao'],
        ['SID_11', 'BAE Systems', 'New Delhi', 'UK', 'Mr. David Smith'],
        ['SID_12', 'Lockheed Martin', 'Bengaluru', 'USA', 'Ms. Jennifer Adams'],
        ['SID_13', 'Raytheon Technologies', 'Hyderabad', 'USA', 'Mr. Brian Johnson'],
        ['SID_14', 'Northrop Grumman', 'Delhi', 'USA', 'Mr. Eric White'],
        ['SID_15', 'Thales Group', 'Pune', 'France', 'Ms. Claire Dupont'],
        ['SID_16', 'Airbus Defence and Space', 'Bangalore', 'Germany', 'Mr. Thomas Müller'],
        ['SID_17', 'Rostec', 'Moscow', 'Russia', 'Mr. Ivan Petrov'],
        ['SID_18', 'Almaz-Antey', 'Moscow', 'Russia', 'Mr. Dmitry Ivanov'],
        ['SID_19', 'Israel Aerospace Industries', 'Tel Aviv', 'Israel', 'Ms. Miriam Cohen'],
        ['SID_20', 'Elbit Systems', 'Haifa', 'Israel', 'Mr. Samuel Levi'],
        ['SID_21', 'Saab Group', 'Stockholm', 'Sweden', 'Mr. Lars Andersson'],
        ['SID_22', 'Bharat Dynamics Limited', 'Hyderabad', 'India', 'Mr. Rajesh Nair'],
        ['SID_23', 'Garden Reach Shipbuilders & Engineers', 'Kolkata', 'India', 'Mr. Sanjay Dutta'],
        ['SID_24', 'Bharat Forge Limited', 'Pune', 'India', 'Mr. Ashish Patil'],
        ['SID_25', 'Indian Ordnance Factories', 'Kanpur', 'India', 'Mr. Ranjit Kumar'],
        ['SID_26', 'Bharat Electronics Kanpur', 'Kanpur', 'India', 'Ms. Pooja Srivastava'],
        ['SID_27', 'Hindustan Aeronautics Kanpur', 'Kanpur', 'India', 'Mr. Amit Sharma'],
        ['SID_28', 'Kalyani Group', 'Pune', 'India', 'Mr. Sandeep Kalyani'],
        ['SID_29', 'Cochin Shipyard Limited', 'Kochi', 'India', 'Mr. Vineet Nair'],
        ['SID_30', 'Tata Consultancy Services', 'Mumbai', 'India', 'Ms. Shilpa Joshi'],
        ['SID_31', 'Hindustan Shipyard Limited', 'Visakhapatnam', 'India', 'Mr. Suresh Babu'],
        ['SID_32', 'Mahindra Aerospace', 'Bangalore', 'India', 'Mr. Rajiv Raghavan'],
        ['SID_33', 'Navratna Defence Limited', 'Delhi', 'India', 'Mr. Vikram Singh'],
        ['SID_34', 'BrahMos Aerospace', 'Delhi', 'India', 'Dr. A. Sivathanu Pillai'],
        ['SID_35', 'Defence Research Development Establishment', 'Gwalior', 'India', 'Dr. Anil Kumar'],
        ['SID_36', 'DRDO Laboratories', 'Hyderabad', 'India', 'Dr. Manohar B. B.'],
        ['SID_37', 'L&T Defence', 'Mumbai', 'India', 'Mr. Anil K. Gupta'],
        ['SID_38', 'Tata Advanced Systems', 'Hyderabad', 'India', 'Mr. Mahesh Bansal'],
        ['SID_39', 'Jain Irrigation Systems', 'Jalna', 'India', 'Mr. Kiran Jain'],
        ['SID_40', 'Kohler Co.', 'Bangalore', 'India', 'Mr. Praveen Kumar'],
        ['SID_41', 'Indian Air Force Supply', 'Delhi', 'India', 'Wing Commander R. Singh'],
        ['SID_42', 'Mitsubishi Heavy Industries', 'Tokyo', 'Japan', 'Mr. Yuki Tanaka'],
        ['SID_43', 'General Dynamics', 'Falls Church', 'USA', 'Mr. Steve Rogers'],
        ['SID_44', 'L3 Technologies', 'New York', 'USA', 'Ms. Julia White'],
        ['SID_45', 'Huntington Ingalls Industries', 'Newport News', 'USA', 'Mr. James Foster'],
        ['SID_46', 'Rolls-Royce', 'Derby', 'UK', 'Ms. Emma Wilson'],
        ['SID_47', 'Leonardo S.p.A.', 'Rome', 'Italy', 'Mr. Marco Rossi'],
        ['SID_48', 'Thyssenkrupp', 'Essen', 'Germany', 'Mr. Hans Müller'],
        ['SID_49', 'BAE Systems Land & Armaments', 'Sterling Heights', 'USA', 'Mr. John Thompson'],
        ['SID_50', 'Oshkosh Corporation', 'Oshkosh', 'USA', 'Ms. Michelle Brown'],
        ['SID_51', 'Textron Inc.', 'Providence', 'USA', 'Mr. Richard Greene'],
        ['SID_52', 'BAE Systems Maritime', 'Portsmouth', 'UK', 'Mr. Simon Grant'],
        ['SID_53', 'AeroVironment', 'Simi Valley', 'USA', 'Mr. Edward Davis'],
        ['SID_54', 'Hensoldt', 'Taufkirchen', 'Germany', 'Mr. Peter Keller'],
        ['SID_55', 'Kongsberg Gruppen', 'Kongsberg', 'Norway', 'Mr. Erik Larsen'],
        ['SID_56', 'Navantia', 'Madrid', 'Spain', 'Mr. Carlos Sanchez'],
        ['SID_57', 'Saab AB', 'Linköping', 'Sweden', 'Mr. Johan Lindström'],
        ['SID_58', 'Korea Aerospace Industries', 'Sacheon', 'South Korea', 'Mr. Kim Soo-hyun'],
        ['SID_59', 'Northrop Grumman Innovation Systems', 'Dulles', 'USA', 'Mr. Matthew Carter'],
        ['SID_60', 'Rheinmetall AG', 'Düsseldorf', 'Germany', 'Mr. Klaus Becker'],
        ['SID_61', 'Leonardo Helicopters', 'Farnborough', 'UK', 'Ms. Sarah Cook'],
        ['SID_62', 'Damen Shipyards Group', 'Gorinchem', 'Netherlands', 'Mr. Mark de Vries'],
        ['SID_63', 'DCNS', 'Brest', 'France', 'Mr. Pierre Leclerc'],
        ['SID_64', 'L3Harris Technologies', 'Melbourne', 'USA', 'Mr. Ryan Harris'],
        ['SID_65', 'Fincantieri', 'Rome', 'Italy', 'Mr. Alberto Moretti'],
        ['SID_66', 'General Electric', 'Cincinnati', 'USA', 'Mr. Thomas Edison'],
        ['SID_67', 'Hawker Beechcraft', 'Wichita', 'USA', 'Mr. Alan Smith'],
        ['SID_68', 'Elbit Systems', 'Haifa', 'Israel', 'Mr. David Levi'],
        ['SID_69', 'IMI Systems', 'Ramat Hasharon', 'Israel', 'Ms. Sara Cohen'],
        ['SID_70', 'Mikoyan', 'Moscow', 'Russia', 'Mr. Alexei Petrov'],
        ['SID_71', 'Sukhoi', 'Komsomolsk-on-Amur', 'Russia', 'Mr. Igor Ivanov'],
        ['SID_72', 'Kamov', 'Moscow', 'Russia', 'Mr. Boris Antonov'],
        ['SID_73', 'Arianespace', 'Evry', 'France', 'Mr. François Delahaye'],
        ['SID_74', 'Thales Alenia Space', 'Toulouse', 'France', 'Mr. Claude Lefevre'],
        ['SID_75', 'Mitsubishi Electric', 'Tokyo', 'Japan', 'Mr. Hitoshi Watanabe'],
        ['SID_76', 'Kawasaki Heavy Industries', 'Kawasaki', 'Japan', 'Mr. Kenji Yamamoto'],
        ['SID_77', 'Toshiba', 'Tokyo', 'Japan', 'Ms. Naoko Takahashi'],
        ['SID_78', 'Rockwell Collins', 'Cedar Rapids', 'USA', 'Mr. Mark Anderson'],
        ['SID_79', 'Textron Systems', 'New Orleans', 'USA', 'Ms. Jessica Wright'],
        ['SID_80', 'General Atomics', 'San Diego', 'USA', 'Mr. Mark McMillan'],
        ['SID_81', 'Maritime and Underwater Systems', 'Helsinki', 'Finland', 'Ms. Aino Virtanen'],
        ['SID_82', 'Hawkeye Systems', 'London', 'UK', 'Mr. Robert Davis'],
        ['SID_83', 'Boeing', 'Chicago', 'USA', 'Mr. Scott Johnson'],
        ['SID_84', 'Rafael Advanced Defense Systems', 'Haifa', 'Israel', 'Mr. Yossi Klein'],
        ['SID_85', 'Meggitt', 'Coventry', 'UK', 'Mr. Tom Harris'],
        ['SID_86', 'ThyssenKrupp Marine Systems', 'Kiel', 'Germany', 'Mr. Oliver Schmidt'],
        ['SID_87', 'Cubic Corporation', 'San Diego', 'USA', 'Mr. Eric Thompson'],
        ['SID_88', 'L-3 Technologies', 'New York', 'USA', 'Mr. Kevin O’Donnell'],
        ['SID_89', 'Diehl Defence', 'Ulm', 'Germany', 'Ms. Anna Schwarz'],
        ['SID_90', 'Korea Shipbuilding & Offshore Engineering', 'Seoul', 'South Korea', 'Mr. Park Jin-soo'],
        ['SID_91', 'Navistar Defense', 'Lisle', 'USA', 'Mr. David Haines'],
        ['SID_92', 'MKEK', 'Ankara', 'Turkey', 'Mr. Ahmet Yilmaz'],
        ['SID_93', 'Kongsberg Automotive', 'Kongsberg', 'Norway', 'Mr. Lars Eriksen'],
        ['SID_94', 'Nexter Systems', 'Versailles', 'France', 'Mr. Julien Charpentier'],
        ['SID_95', 'Rheinmetall Defence', 'Düsseldorf', 'Germany', 'Mr. Georg Weber'],
        ['SID_96', 'Harris Corporation', 'Melbourne', 'USA', 'Ms. Julia Smith'],
        ['SID_97', 'Meyer Werft', 'Papenburg', 'Germany', 'Mr. Wolfgang Meyer'],
        ['SID_98', 'Meyer Sound Laboratories', 'Berkeley', 'USA', 'Mr. John Meyer'],
        ['SID_99', 'Embraer', 'São José dos Campos', 'Brazil', 'Mr. Carlos Martins'],
        ['SID_100', 'BAE Systems Electronics', 'New York', 'USA', 'Ms. Linda Johnson'],
        ['SID_101', 'Hensoldt Sensors', 'Taufkirchen', 'Germany', 'Mr. Dieter Fischer'],
        ['SID_102', 'C-DoT', 'Delhi', 'India', 'Ms. Reema Singh'],
        ['SID_103', 'General Dynamics Mission Systems', 'Marlborough', 'USA', 'Mr. Brian Allen'],
        ['SID_104', 'Leidos', 'Reston', 'USA', 'Mr. Richard Barlow'],
        ['SID_105', 'L-3 Communications', 'New York', 'USA', 'Mr. Michael Carter'],
        ['SID_106', 'Oshkosh Defense', 'Oshkosh', 'USA', 'Mr. David O’Reilly'],
        ['SID_107', 'BAE Systems Australia', 'Sydney', 'Australia', 'Ms. Fiona Clark'],
        ['SID_108', 'Northrop Grumman Australia', 'Canberra', 'Australia', 'Mr. James Kelly'],
        ['SID_109', 'Hindustan Aeronautics Ltd.', 'Bangalore', 'India', 'Mr. Gopal Reddy'],
        ['SID_110', 'Airbus Group', 'Toulouse', 'France', 'Mr. Pierre Dupont'],
        ['SID_111', 'Boeing Defence, Space & Security', 'Huntington Beach', 'USA', 'Ms. Rachel Green'],
        ['SID_112', 'Maritime Systems', 'Washington', 'USA', 'Mr. Allen Lewis'],
        ['SID_113', 'Airbus Military', 'Getafe', 'Spain', 'Mr. Sergio Martinez'],
        ['SID_114', 'Dawn Aerospace', 'Christchurch', 'New Zealand', 'Ms. Amelia Wright'],
        ['SID_115', 'Raytheon Intelligence & Space', 'Waltham', 'USA', 'Mr. Mark Thompson'],
        ['SID_116', 'Harris Geospatial', 'Boulder', 'USA', 'Ms. Linda Wilson'],
        ['SID_117', 'SAIC', 'Reston', 'USA', 'Mr. Edward Taylor'],
        ['SID_118', 'Leonardo DRS', 'McLean', 'USA', 'Mr. Chris Robinson'],
        ['SID_119', 'Thales Communications', 'Paris', 'France', 'Ms. Isabelle Dupuis'],
        ['SID_120', 'Viasat', 'Carlsbad', 'USA', 'Mr. David Lee'],
        ['SID_121', 'Aerojet Rocketdyne', 'El Segundo', 'USA', 'Mr. Thomas Edwards'],
        ['SID_122', 'Magellan Aerospace', 'Winnipeg', 'Canada', 'Mr. Nathan Patel'],
        ['SID_123', 'Collins Aerospace', 'Cedar Rapids', 'USA', 'Mr. James Martinez'],
        ['SID_124', 'Orbital ATK', 'Dulles', 'USA', 'Mr. Steven Lewis'],
        ['SID_125', 'Rohde & Schwarz', 'Munich', 'Germany', 'Ms. Anna Weiss'],
        ['SID_126', 'Hägglunds', 'Örnsköldsvik', 'Sweden', 'Mr. Karl Eriksson'],
        ['SID_127', 'General Atomics Aeronautical Systems', 'Palmdale', 'USA', 'Mr. Charles White'],
        ['SID_128', 'Mitsubishi Heavy Industries Aerospace', 'Tokyo', 'Japan', 'Ms. Haruka Tanaka'],
        ['SID_129', 'Kawasaki Heavy Industries Aerospace', 'Kawasaki', 'Japan', 'Mr. Shoji Yamamoto'],
        ['SID_130', 'Bombardier Defence', 'Montreal', 'Canada', 'Mr. Alexandre Dupuis'],
        ['SID_131', 'Northrop Grumman Mission Systems', 'Dulles', 'USA', 'Mr. Timothy Johnson'],
        ['SID_132', 'Kraken Robotics', 'St. Johns', 'Canada', 'Mr. Ian McDonald'],
        ['SID_133', 'Leonardo Electronics', 'Rome', 'Italy', 'Mr. Marco Rossi'],
        ['SID_134', 'Boeing Commercial Airplanes', 'Seattle', 'USA', 'Ms. Sarah O’Brien'],
        ['SID_135', 'Thales Underwater Systems', 'Brest', 'France', 'Mr. Jacques Leclerc'],
        ['SID_136', 'Saab Technologies', 'Linköping', 'Sweden', 'Ms. Ingrid Svensson'],
        ['SID_137', 'GKN Aerospace', 'Bristol', 'UK', 'Mr. Jonathan Davis'],
        ['SID_138', 'Harris RF Communications', 'Rochester', 'USA', 'Mr. Jacob Wright'],
        ['SID_139', 'Hawker Pacific', 'Brisbane', 'Australia', 'Mr. Adam Brown'],
        ['SID_140', 'Cubic Defense Applications', 'San Diego', 'USA', 'Ms. Nicole King'],
        ['SID_141', 'Hensoldt Optronics', 'Taufkirchen', 'Germany', 'Mr. Sebastian Fischer'],
        ['SID_142', 'Sierra Nevada Corporation', 'Sparks', 'USA', 'Mr. Brian Carter'],
        ['SID_143', 'Rheinmetall Landsysteme', 'Kiel', 'Germany', 'Mr. Wolfgang Meyer'],
        ['SID_144', 'Ultra Electronics', 'London', 'UK', 'Ms. Emma Taylor'],
        ['SID_145', 'Meggitt Training Systems', 'Suwanee', 'USA', 'Mr. Luke Johnson'],
        ['SID_146', 'Cubic Global Defense', 'San Diego', 'USA', 'Ms. Caroline Green'],
        ['SID_147', 'Northrop Grumman Aerospace', 'Los Angeles', 'USA', 'Mr. Jack Harris'],
        ['SID_148', 'Nexter Robotics', 'Versailles', 'France', 'Mr. Pierre Charpentier'],
        ['SID_149', 'Korea Aerospace Industries Defense', 'Seongnam', 'South Korea', 'Mr. Ji-hoon Park'],
        ['SID_150', 'Thales Air Defence', 'Paris', 'France', 'Mr. Julien Lefevre']
    ];




    // Construct the insert query for multiple rows
    const query = `
        INSERT INTO Supplier (Supplier_Id,Supplier_Name,Supplier_Location,Supplier_Country,Representative)
        VALUES ?;
    `;

    // Execute the batch insert
    db2.query(query, [supplier], (error, results) => {
        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log(`Suppliers added successfully: ${results.affectedRows} rows inserted.`);
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
