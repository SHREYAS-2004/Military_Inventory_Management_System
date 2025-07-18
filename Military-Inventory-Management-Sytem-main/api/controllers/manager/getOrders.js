import { db } from "../../database.js";

function getOrders(req,res){
    const query = `SELECT * FROM Temporary_Order`

    db.query(query,(err,result) => {
        if(err){
            return res.status(500).json("Error fetching data")
        }
        else{
            res.status(200).json(result)
        }
    })
}

export default getOrders