import { db } from "../../database.js"


function aggregatedOrder(req,res){
    const query = `CALL aggregate_requests();`

    db.query(query,(err,response)=>{
        if(err){
            console.log("error in fetching the data",err)
        }
        else{

            const query2 = `CALL process_aggregated_requests();`

            db.query(query2,(err,response) => {
                if(err){
                    console.log("error in aggregating the data",err)
                    res.status(500).json("Error in aggregation")
                }
                else{
                    res.status(200).json("Aggregation action done successfully")
                }
            })
        }
    })
}

export default aggregatedOrder