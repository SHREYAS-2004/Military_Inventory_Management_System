import { db } from "../database.js";

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

const q = `SELECT b.Product_Name FROM Battalion b`

db.query(q,(err,data)=>{
    if(err){
        console.log("some error occured",err)
    }
    else{
        console.log(data)
    }
})

// function Getproductnames(req,res){
//     const q = `SELECT b.Product_Name FROM Battalion b`

//     db2.query(q,(err,data)=>{
//         if(err){
//             console.log("some error occured",err)
//         }
//         else{
//             console.log(data)
//         }
//     })
// }

// Getproductnames