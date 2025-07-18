import React, { useEffect, useState } from 'react'
import { Typography, Button, Card, TextField } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from "axios";

function OrderEquipment() {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:3000/manager/getOrders`, {
                headers: { "Content-Type": "application/json" }
            })

            console.log(response)
            setOrders(response.data)
        }

        fetchData()
    }, [])

    const columns = [
        { field: 'Product_Id', headerName: 'Product Id', width: 400 },
        { field: 'Total_Requested_Quantity', headerName: 'Requested Quantity', width: 400 },
        { field: 'Best_Supplier', headerName: 'Supplier ID', width: 400 },

    ]

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div className='manager-order'>
            <Paper sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={orders}
                    columns={columns}
                    getRowId={(row) => row.Product_Id} // Use Aggregated_Id as the unique identifier
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />

            </Paper>

            <Button className='button' variant='outlined' size="large" onClick={() => {
                async function aggregate() {
                    try {
                        const response = await axios.post(`http://localhost:3000/manager/aggregateOrder`)

                        console.log(response)
                        alert("Product aggregated successfully")
                    } catch (err) {
                        console.log("Some error occured", err)
                        alert("Aggregation failed")
                    }
                }

                aggregate()
            }}>Aggregate Orders</Button>

            <Button className='button' variant='contained' size='large' onClick={() => {
                async function orderFunction() {
                    try {
                        const response = await axios.post("http://localhost:3000/manager/orderResources", {
                            order: orders
                        }, {
                            headers: { "Content-Type": "application-json" }
                        })

                        console.log("Posted successfully")
                        alert("Order successful")
                    }
                    catch (error) {
                        console.log("Error occured in posting the data", error)
                        alert("Order request failed")
                    }
                }

                orderFunction()
            }}>Order</Button>
        </div>
    )
}

export default OrderEquipment
