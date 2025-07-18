import { Button, Card, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import axios from "axios"

function Allocateresource() {
    const [allocationId,setAllocationId] = useState("")
    const [battalionId,setBattalionId] = useState("")
    const [productId,setProductId] = useState("")
    const [quantity,setQuantity] = useState(0)
    

    return (
        <div className='allocateresource'>
            <div className='heading'>
                <Typography variant='h3'>Enter the allocation details </Typography>
            </div>
            <Card className='Card'>
                <TextField label='Allocation ID' variant='outlined' onClick={(e) => {
                    setAllocationId(e.target.value)
                }}/>
                <TextField label='Batallion ID' variant='outlined' onClick={(e) => {
                    setBattalionId(e.target.value)
                }}/>
                <TextField label='Product ID' variant='outlined' onClick={(e) => {
                    setProductId(e.target.value)
                }}/>
                <TextField label='Quantity Authorised' variant='outlined' onClick={(e) => {
                    setQuantity(e.target.value)
                }}/>

                <Button variant='contained' size='large' onClick={()=>{
                    async function allocate(){
                        try{
                            const response = await axios.post("http://localhost:3000/admin/allocate",{
                                allocationId,
                                battalionId,
                                productId,
                                quantity
                            },{
                                headers : {"Content-Type":"application/json"}
                            })

                            alert("Allocation successful")
                        }
                        catch(err){
                            console.log(err)
                            alert("error occured in allocation")
                        }
                        
                    }

                    allocate()
                }}>Submit</Button>
            </Card>
        </div>
    )
}

export default Allocateresource
