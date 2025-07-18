import {db} from "../../database.js";

function battalionAllocation(req,res){
    const {B_Id} = req.params

    const query = `SELECT Allocation_Id,Product_Id,Allocated_Quantity FROM Allocation WHERE Battalion_Id = ?`

    db.query(query,[B_Id],(err,result) => {
        if(err){
            return res.status(500).json("Error in fetching data")
        }
        else{
            res.status(200).json(result)
        }
    })
}

export default battalionAllocation