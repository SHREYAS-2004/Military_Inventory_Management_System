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
    const battalion = [
        ['BID_1', '1st Horse (Skinners Horse)', 'Delhi', 'Delhi Cantonment', 'Col. Rajesh Sharma', 350],
        ['BID_2', '2nd Lancers (Gardners Horse)', 'Jaipur', 'Jaipur Fort', 'Col. Amit Kumar', 320],
        ['BID_3', '3rd Cavalry', 'Jodhpur', 'Jodhpur Military Station', 'Col. Vikram Singh', 300],
        ['BID_4', '4th Horse (Hodsons Horse)', 'Lucknow', 'Lucknow Cantonment', 'Col. Arjun Mehta', 310],
        ['BID_5', '5th Armoured Regiment', 'Ambala', 'Ambala Cantt', 'Col. Ramesh Verma', 270],
        ['BID_6', '6th Lancers', 'Ahmedabad', 'Ahmedabad Military Base', 'Col. Neeraj Gupta', 260],
        ['BID_7', '7th Light Cavalry', 'Bhopal', 'Bhopal Army Base', 'Col. Sanjay Bansal', 280],
        ['BID_8', '8th Light Cavalry', 'Indore', 'Indore Army Camp', 'Col. Deepak Joshi', 250],
        ['BID_9', '9th Horse (The Deccan Horse)', 'Hyderabad', 'Secunderabad Cantonment', 'Col. Ravi Prakash', 290],
        ['BID_10', '10 Armoured Regiment', 'Srinagar', 'Srinagar Military Station', 'Col. Manoj Choudhary', 240],
        ['BID_11', '11 Armoured Regiment', 'Pathankot', 'Pathankot Base', 'Col. Anil Kapoor', 230],
        ['BID_12', '12 Armoured Regiment', 'Amritsar', 'Amritsar Military Base', 'Col. Sudhir Sharma', 220],
        ['BID_13', '13 Armoured Regiment', 'Fatehgarh', 'Fatehgarh Military Base', 'Col. Ajay Singh', 240],
        ['BID_14', '14 Horse (The Scinde Horse)', 'Karachi', 'Karachi Army Base', 'Col. Vishal Khanna', 210],
        ['BID_15', '15 Armoured Regiment', 'Chandigarh', 'Chandigarh Military Camp', 'Col. Raghav Agarwal', 300],
        ['BID_16', '16th Light Cavalry', 'Pune', 'Pune Army Camp', 'Col. Prakash Rao', 260],
        ['BID_17', '17th Horse (The Poona Horse)', 'Mumbai', 'Mumbai Military Station', 'Col. Karan Mehta', 320],
        ['BID_18', '18th Cavalry', 'Jammu', 'Jammu Army Base', 'Col. Nitin Bhatia', 280],
        ['BID_19', '19 Armoured Regiment', 'Delhi', 'Delhi Cantonment', 'Col. Mohit Sethi', 290],
        ['BID_20', '20 Lancers', 'Nashik', 'Nashik Army Camp', 'Col. Manish Verma', 310],
        ['BID_21', '21 Horse (Central India Horse)', 'Gwalior', 'Gwalior Fort', 'Col. Kunal Sinha', 270],
        ['BID_22', '41 Armoured Regiment', 'Bhopal', 'Bhopal Military Base', 'Col. Harsh Yadav', 250],
        ['BID_23', '42 Armoured Regiment', 'Indore', 'Indore Military Station', 'Col. Ravi Kumar', 230],
        ['BID_24', '43 Armoured Regiment', 'Dehradun', 'Dehradun Army Base', 'Col. Aakash Mehta', 260],
        ['BID_25', '44 Armoured Regiment', 'Agra', 'Agra Military Camp', 'Col. Prashant Singh', 280],
        ['BID_26', '45 Cavalry', 'Bikaner', 'Bikaner Army Camp', 'Col. Vikrant Chaudhary', 240],
        ['BID_27', '46 Armoured Regiment', 'Jaisalmer', 'Jaisalmer Military Base', 'Col. Ritesh Sharma', 220],
        ['BID_28', '47 Armoured Regiment', 'Kota', 'Kota Army Base', 'Col. Shashank Kumar', 250],
        ['BID_29', '48 Armoured Regiment', 'Ajmer', 'Ajmer Army Camp', 'Col. Sumit Gupta', 270],
        ['BID_30', '49 Armoured Regiment', 'Jodhpur', 'Jodhpur Military Station', 'Col. Rakesh Verma', 300],
        ['BID_31', '50 Armoured Regiment', 'Panchkula', 'Panchkula Military Camp', 'Col. Jitendra Soni', 290],
        ['BID_32', '51 Armoured Regiment', 'Hisar', 'Hisar Military Base', 'Col. Tarun Khanna', 260],
        ['BID_33', '52 Armoured Regiment', 'Faridabad', 'Faridabad Army Camp', 'Col. Naveen Kumar', 280],
        ['BID_34', '53 Armoured Regiment', 'Rohtak', 'Rohtak Military Base', 'Col. Raghav Sharma', 240],
        ['BID_35', '54 Armoured Regiment', 'Ambala', 'Ambala Cantt', 'Col. Ashish Patil', 230],
        ['BID_36', '55 Armoured Regiment', 'Sonipat', 'Sonipat Army Camp', 'Col. Punit Singh', 220],
        ['BID_37', '56 Armoured Regiment', 'Gurgaon', 'Gurgaon Military Station', 'Col. Arvind Gupta', 250],
        ['BID_38', '57 Armoured Regiment', 'Kurukshetra', 'Kurukshetra Army Base', 'Col. Nitin Sharma', 260],
        ['BID_39', '58 Armoured Regiment', 'Karnal', 'Karnal Military Camp', 'Col. Vishal Yadav', 270],
        ['BID_40', '59 Armoured Regiment', 'Rohtak', 'Rohtak Army Base', 'Col. Ashok Kumar', 280],
        ['BID_41', '60 Armoured Regiment', 'Chandigarh', 'Chandigarh Military Base', 'Col. Ramesh Bansal', 300],
        ['BID_42', '61 Cavalry', 'Meerut', 'Meerut Army Camp', 'Col. Sandeep Verma', 290],
        ['BID_43', '62 Cavalry', 'Dehradun', 'Dehradun Military Base', 'Col. Sunil Singh', 280],
        ['BID_44', '63 Cavalry', 'Jodhpur', 'Jodhpur Military Station', 'Col. Amit Soni', 270],
        ['BID_45', '64 Cavalry', 'Jaipur', 'Jaipur Fort', 'Col. Vinay Kapoor', 260],
        ['BID_46', '65 Armoured Regiment', 'Srinagar', 'Srinagar Military Camp', 'Col. Manoj Sharma', 240],
        ['BID_47', '66 Armoured Regiment', 'Amritsar', 'Amritsar Military Base', 'Col. Ashish Kumar', 230],
        ['BID_48', '67 Armoured Regiment', 'Patiala', 'Patiala Army Camp', 'Col. Ravi Mehta', 250],
        ['BID_49', '68 Armoured Regiment', 'Ludhiana', 'Ludhiana Military Station', 'Col. Gaurav Bhatia', 220],
        ['BID_50', '69 Armoured Regiment', 'Mohali', 'Mohali Army Base', 'Col. Prakash Singh', 270],
        ['BID_51', '70 Armoured Regiment', 'Karnal', 'Karnal Military Camp', 'Col. Neeraj Gupta', 290],
        ['BID_52', '71 Armoured Regiment', 'Ambala', 'Ambala Cantt', 'Col. Shubham Jain', 260],
        ['BID_53', '72 Armoured Regiment', 'Faridabad', 'Faridabad Military Base', 'Col. Karan Singh', 240],
        ['BID_54', '73 Armoured Regiment', 'Gurgaon', 'Gurgaon Army Camp', 'Col. Ajay Bansal', 250],
        ['BID_55', '74 Armoured Regiment', 'Rohtak', 'Rohtak Army Base', 'Col. Deepak Sharma', 230],
        ['BID_56', '75 Armoured Regiment', 'Jammu', 'Jammu Military Base', 'Col. Sanjeev Kumar', 300],
        ['BID_57', '81 Armoured Regiment', 'Pathankot', 'Pathankot Base', 'Col. Ashish Sharma', 290],
        ['BID_58', '82 Armoured Regiment', 'Chandigarh', 'Chandigarh Military Base', 'Col. Manish Sharma', 280],
        ['BID_59', '83 Cavalry', 'Pune', 'Pune Army Camp', 'Col. Hitesh Kumar', 260],
        ['BID_60', '84 Cavalry', 'Ahmedabad', 'Ahmedabad Military Station', 'Col. Rohan Patel', 270],
        ['BID_61', '85 Armoured Regiment', 'Jaisalmer', 'Jaisalmer Military Base', 'Col. Vikas Bansal', 220],
        ['BID_62', '86 Armoured Regiment', 'Bhopal', 'Bhopal Army Base', 'Col. Rajesh Kumar', 240],
        ['BID_63', '87 Armoured Regiment', 'Indore', 'Indore Military Base', 'Col. Ashok Mehta', 260],
        ['BID_64', '88 Cavalry', 'Lucknow', 'Lucknow Cantonment', 'Col. Deepak Yadav', 270],
        ['BID_65', '89 Cavalry', 'Mumbai', 'Mumbai Military Station', 'Col. Shubham Verma', 280],
        ['BID_66', '90 Cavalry', 'Nashik', 'Nashik Army Camp', 'Col. Raghav Sharma', 220],
        ['BID_67', '91 Cavalry', 'Srinagar', 'Srinagar Military Station', 'Col. Pankaj Kumar', 230],
        ['BID_68', '92 Cavalry', 'Jodhpur', 'Jodhpur Military Station', 'Col. Kunal Joshi', 260],
        ['BID_69', '93 Armoured Regiment', 'Bhopal', 'Bhopal Army Base', 'Col. Manoj Soni', 240],
        ['BID_70', '94 Armoured Regiment', 'Ajmer', 'Ajmer Military Camp', 'Col. Sunil Kumar', 230],
        ['BID_71', '95 Armoured Regiment', 'Delhi', 'Delhi Cantonment', 'Col. Virender Singh', 250],
        ['BID_72', '96 Armoured Regiment', 'Jaipur', 'Jaipur Military Station', 'Col. Kunal Sharma', 270],
        ['BID_73', '97 Cavalry', 'Indore', 'Indore Army Base', 'Col. Rahul Yadav', 280],
        ['BID_74', '98 Cavalry', 'Chandigarh', 'Chandigarh Military Base', 'Col. Harish Verma', 290],
        ['BID_75', '99 Armoured Regiment', 'Pune', 'Pune Military Camp', 'Col. Gaurav Singh', 300],
        ['BID_76', '100 Cavalry', 'Lucknow', 'Lucknow Cantonment', 'Col. Manoj Kumar', 250],
        ['BID_77', '101 Cavalry', 'Ahmedabad', 'Ahmedabad Military Station', 'Col. Shubham Bansal', 240],
        ['BID_78', '102 Cavalry', 'Jammu', 'Jammu Military Base', 'Col. Vikram Yadav', 220],
        ['BID_79', '103 Cavalry', 'Kolkata', 'Kolkata Army Base', 'Col. Ashok Gupta', 260],
        ['BID_80', '104 Cavalry', 'Gurgaon', 'Gurgaon Army Camp', 'Col. Anil Mehta', 250],
        ['BID_81', '105 Armoured Regiment', 'Bhopal', 'Bhopal Army Base', 'Col. Rajesh Yadav', 270],
        ['BID_82', '106 Cavalry', 'Nashik', 'Nashik Army Base', 'Col. Praveen Kumar', 280],
        ['BID_83', '107 Armoured Regiment', 'Jaisalmer', 'Jaisalmer Military Station', 'Col. Vikrant Kumar', 230],
        ['BID_84', '108 Armoured Regiment', 'Patiala', 'Patiala Army Camp', 'Col. Manish Bansal', 220],
        ['BID_85', '109 Cavalry', 'Ludhiana', 'Ludhiana Military Station', 'Col. Ajay Verma', 240],
        ['BID_86', '110 Cavalry', 'Hisar', 'Hisar Army Base', 'Col. Hitesh Mehta', 250],
        ['BID_87', '111 Armoured Regiment', 'Chandigarh', 'Chandigarh Military Base', 'Col. Pradeep Singh', 260],
        ['BID_88', '112 Armoured Regiment', 'Ambala', 'Ambala Cantt', 'Col. Amit Kumar', 270],
        ['BID_89', '113 Cavalry', 'Bhopal', 'Bhopal Military Camp', 'Col. Suraj Kumar', 220],
        ['BID_90', '114 Cavalry', 'Pune', 'Pune Military Station', 'Col. Rajiv Bansal', 250],
        ['BID_91', '115 Armoured Regiment', 'Agra', 'Agra Army Camp', 'Col. Ramesh Mehta', 280],
        ['BID_92', '116 Cavalry', 'Indore', 'Indore Military Station', 'Col. Sanjay Sharma', 290],
        ['BID_93', '117 Cavalry', 'Pathankot', 'Pathankot Army Base', 'Col. Prashant Yadav', 310],
        ['BID_94', '118 Cavalry', 'Amritsar', 'Amritsar Military Base', 'Col. Pradeep Kumar', 270],
        ['BID_95', '119 Cavalry', 'Srinagar', 'Srinagar Army Base', 'Col. Ravi Gupta', 250],
        ['BID_96', '120 Armoured Regiment', 'Bhopal', 'Bhopal Army Base', 'Col. Devender Kumar', 280],
        ['BID_97', '121 Armoured Regiment', 'Delhi', 'Delhi Military Base', 'Col. Subhash Chander', 300],
        ['BID_98', '122 Armoured Regiment', 'Dehradun', 'Dehradun Army Base', 'Col. Ajay Kumar', 260],
        ['BID_99', '123 Cavalry', 'Kolkata', 'Kolkata Military Camp', 'Col. Sandeep Sharma', 220],
        ['BID_100', '124 Cavalry', 'Nashik', 'Nashik Army Camp', 'Col. Karan Kumar', 270],
        ['BID_101', '125 Cavalry', 'Indore', 'Indore Military Base', 'Col. Sanjay Yadav', 280],
        ['BID_102', '126 Cavalry', 'Jammu', 'Jammu Army Base', 'Col. Ashok Singh', 230],
        ['BID_103', '127 Armoured Regiment', 'Kolkata', 'Kolkata Army Base', 'Col. Vishal Mehta', 240],
        ['BID_104', '128 Armoured Regiment', 'Agra', 'Agra Military Station', 'Col. Shankar Sharma', 250],
        ['BID_105', '129 Armoured Regiment', 'Jaipur', 'Jaipur Fort', 'Col. Rajeev Yadav', 270],
        ['BID_106', '130 Cavalry', 'Srinagar', 'Srinagar Military Base', 'Col. Harish Kumar', 290],
        ['BID_107', '131 Cavalry', 'Bhopal', 'Bhopal Army Camp', 'Col. Nitin Yadav', 260],
        ['BID_108', '132 Cavalry', 'Chandigarh', 'Chandigarh Army Camp', 'Col. Sudhir Verma', 280],
        ['BID_109', '133 Cavalry', 'Patiala', 'Patiala Army Base', 'Col. Parveen Yadav', 220],
        ['BID_110', '134 Cavalry', 'Mumbai', 'Mumbai Army Base', 'Col. Rajesh Kumar', 270],
        ['BID_111', '135 Cavalry', 'Hisar', 'Hisar Military Base', 'Col. Kunal Bansal', 280],
        ['BID_112', '136 Armoured Regiment', 'Lucknow', 'Lucknow Army Base', 'Col. Ravi Bansal', 250],
        ['BID_113', '137 Cavalry', 'Delhi', 'Delhi Cantonment', 'Col. Vikram Mehta', 270],
        ['BID_114', '138 Cavalry', 'Ahmedabad', 'Ahmedabad Army Camp', 'Col. Shashank Yadav', 220],
        ['BID_115', '139 Cavalry', 'Gurgaon', 'Gurgaon Military Station', 'Col. Ashok Verma', 240],
        ['BID_116', '140 Armoured Regiment', 'Chandigarh', 'Chandigarh Army Base', 'Col. Rakesh Kumar', 300],
        ['BID_117', '141 Cavalry', 'Pune', 'Pune Army Camp', 'Col. Manish Sharma', 250],
        ['BID_118', '142 Cavalry', 'Kolkata', 'Kolkata Army Camp', 'Col. Sandeep Verma', 280],
        ['BID_119', '143 Cavalry', 'Amritsar', 'Amritsar Army Camp', 'Col. Harish Kumar', 260],
        ['BID_120', '144 Cavalry', 'Indore', 'Indore Military Station', 'Col. Anil Gupta', 270],
        ['BID_121', '145 Armoured Regiment', 'Jaisalmer', 'Jaisalmer Military Station', 'Col. Pradeep Mehta', 220],
        ['BID_122', '146 Cavalry', 'Nashik', 'Nashik Army Base', 'Col. Karan Mehta', 230],
        ['BID_123', '147 Armoured Regiment', 'Jammu', 'Jammu Army Camp', 'Col. Nikhil Sharma', 250],
        ['BID_124', '148 Cavalry', 'Pathankot', 'Pathankot Military Base', 'Col. Ramesh Verma', 240],
        ['BID_125', '149 Armoured Regiment', 'Patiala', 'Patiala Army Camp', 'Col. Sunil Mehta', 260],
        ['BID_126', '150 Cavalry', 'Pune', 'Pune Military Station', 'Col. Rajesh Mehta', 230],
        ['BID_127', '151 Cavalry', 'Srinagar', 'Srinagar Army Base', 'Col. Ajeet Kumar', 280],
        ['BID_128', '152 Armoured Regiment', 'Bhopal', 'Bhopal Army Base', 'Col. Kiran Yadav', 270],
        ['BID_129', '153 Cavalry', 'Jaipur', 'Jaipur Army Base', 'Col. Praveen Gupta', 290],
        ['BID_130', '154 Armoured Regiment', 'Indore', 'Indore Military Base', 'Col. Rahul Mehta', 250],
        ['BID_131', '155 Cavalry', 'Agra', 'Agra Military Station', 'Col. Ajay Kumar', 260],
        ['BID_132', '156 Cavalry', 'Ambala', 'Ambala Army Base', 'Col. Amit Kumar', 270],
        ['BID_133', '157 Armoured Regiment', 'Kolkata', 'Kolkata Army Base', 'Col. Deepak Bansal', 230],
        ['BID_134', '158 Cavalry', 'Jaipur', 'Jaipur Military Station', 'Col. Harish Yadav', 240],
        ['BID_135', '159 Cavalry', 'Ahmedabad', 'Ahmedabad Army Base', 'Col. Karan Kumar', 280],
        ['BID_136', '160 Cavalry', 'Lucknow', 'Lucknow Cantonment', 'Col. Ravi Sharma', 250],
        ['BID_137', '161 Cavalry', 'Jodhpur', 'Jodhpur Army Base', 'Col. Subhash Kumar', 270],
        ['BID_138', '162 Cavalry', 'Indore', 'Indore Military Camp', 'Col. Dinesh Yadav', 220],
        ['BID_139', '163 Armoured Regiment', 'Delhi', 'Delhi Army Base', 'Col. Sameer Kumar', 250],
        ['BID_140', '164 Cavalry', 'Bhopal', 'Bhopal Military Camp', 'Col. Nikhil Mehta', 280],
        ['BID_141', '165 Armoured Regiment', 'Jammu', 'Jammu Military Station', 'Col. Praveen Kumar', 220],
        ['BID_142', '166 Cavalry', 'Dehradun', 'Dehradun Army Base', 'Col. Shubham Gupta', 270],
        ['BID_143', '167 Cavalry', 'Delhi', 'Delhi Military Station', 'Col. Nitin Kumar', 250],
        ['BID_144', '168 Cavalry', 'Gurgaon', 'Gurgaon Military Base', 'Col. Kunal Yadav', 240],
        ['BID_145', '169 Armoured Regiment', 'Pune', 'Pune Army Camp', 'Col. Virender Bansal', 280],
        ['BID_146', '170 Cavalry', 'Bhopal', 'Bhopal Army Station', 'Col. Sandeep Kumar', 250],
        ['BID_147', '171 Cavalry', 'Jaipur', 'Jaipur Army Base', 'Col. Sunil Yadav', 240],
        ['BID_148', '172 Cavalry', 'Patiala', 'Patiala Army Station', 'Col. Rajesh Kumar', 260],
        ['BID_149', '173 Cavalry', 'Agra', 'Agra Army Base', 'Col. Shankar Mehta', 220],
        ['BID_150', '174 Cavalry', 'Indore', 'Indore Military Station', 'Col. Ajay Kumar', 280],
        ['BID_151', '175 Cavalry', 'Chandigarh', 'Chandigarh Military Camp', 'Col. Rakesh Yadav', 270],
        ['BID_152', '176 Cavalry', 'Pune', 'Pune Army Camp', 'Col. Raghav Kumar', 260],
        ['BID_153', '177 Armoured Regiment', 'Nashik', 'Nashik Army Base', 'Col. Sanjay Kumar', 270],
        ['BID_154', '178 Cavalry', 'Lucknow', 'Lucknow Army Camp', 'Col. Subhash Yadav', 250],
        ['BID_155', '179 Armoured Regiment', 'Jaipur', 'Jaipur Military Camp', 'Col. Karan Sharma', 230],
        ['BID_156', '180 Cavalry', 'Ambala', 'Ambala Army Station', 'Col. Vikram Bansal', 280],
        ['BID_157', '181 Cavalry', 'Indore', 'Indore Army Base', 'Col. Ravi Yadav', 240],
        ['BID_158', '182 Cavalry', 'Srinagar', 'Srinagar Military Station', 'Col. Ramesh Bansal', 270],
        ['BID_159', '183 Cavalry', 'Ahmedabad', 'Ahmedabad Military Base', 'Col. Harish Kumar', 250],
        ['BID_160', '184 Armoured Regiment', 'Delhi', 'Delhi Military Camp', 'Col. Subhash Bansal', 240],
        ['BID_161', '185 Cavalry', 'Lucknow', 'Lucknow Army Base', 'Col. Nitin Mehta', 220],
        ['BID_162', '186 Cavalry', 'Chandigarh', 'Chandigarh Military Station', 'Col. Pradeep Yadav', 270],
        ['BID_163', '187 Armoured Regiment', 'Indore', 'Indore Army Camp', 'Col. Anil Bansal', 290],
        ['BID_164', '188 Cavalry', 'Jaisalmer', 'Jaisalmer Army Base', 'Col. Kunal Yadav', 250],
        ['BID_165', '189 Armoured Regiment', 'Dehradun', 'Dehradun Army Camp', 'Col. Ramesh Yadav', 280],
        ['BID_166', '190 Cavalry', 'Agra', 'Agra Military Station', 'Col. Virendra Mehta', 270],
        ['BID_167', '191 Cavalry', 'Mumbai', 'Mumbai Military Base', 'Col. Nitin Bansal', 230],
        ['BID_168', '192 Cavalry', 'Pune', 'Pune Military Station', 'Col. Deepak Yadav', 220],
        ['BID_169', '193 Armoured Regiment', 'Kolkata', 'Kolkata Military Camp', 'Col. Shankar Yadav', 250],
        ['BID_170', '194 Cavalry', 'Jammu', 'Jammu Military Station', 'Col. Raghav Mehta', 240],
        ['BID_171', '195 Armoured Regiment', 'Jaipur', 'Jaipur Army Camp', 'Col. Ranjan Sharma', 270],
        ['BID_172', '196 Cavalry', 'Chandigarh', 'Chandigarh Army Camp', 'Col. Vikrant Mehta', 220],
        ['BID_173', '197 Cavalry', 'Ahmedabad', 'Ahmedabad Army Base', 'Col. Ravi Kumar', 230],
        ['BID_174', '198 Cavalry', 'Delhi', 'Delhi Military Station', 'Col. Karan Sharma', 250],
        ['BID_175', '199 Cavalry', 'Lucknow', 'Lucknow Cantonment', 'Col. Shankar Yadav', 240],
        ['BID_176', '200 Armoured Regiment', 'Indore', 'Indore Army Camp', 'Col. Arvind Mehta', 260]
        ];
        
    

    // Construct the insert query for multiple rows
    const query = `
        INSERT INTO Battalion (Battalion_Id, Name, Location, Headquarters, Colonel, Number_of_Soldiers)
        VALUES ?;
    `;

    // Execute the batch insert
    db2.query(query, [battalion], (error, results) => {
        if (error) {
            console.error("Error inserting data:", error);
        } else {
            console.log(`Battalions added successfully: ${results.affectedRows} rows inserted.`);
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
