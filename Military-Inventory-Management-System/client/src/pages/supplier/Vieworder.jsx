import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { Button } from '@mui/material';

function Vieworder() {

    const [orders, setOrders] = useState([])
    const [message, setMessage] = useState('');

    const username = localStorage.getItem("username")
    const SID = "SID_" + username.slice(-1)

    const handleDeliveryClick = async () => {
        if (!SID) {
            setMessage("Please enter a supplier ID.");
            return;
        }

        try {
            // Call backend to deliver orders for the given supplier
            const response = await axios.post('http://localhost:3000/supplier/deliver-orders', { supplierId: SID });

            // Axios automatically parses the JSON response
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error:', error);

            // Handle error response gracefully
            if (error.response && error.response.data && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("An error occurred while delivering orders.");
            }
        }
    };


    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:3000/supplier/viewOrder/${SID}`, {
                headers: { "Content-Type": "application/json" }
            })

            console.log(response.data)

            setOrders(response.data)
        }

        fetchData()
    }, [SID])

    const columns = [
        { field: 'Order_Id', headerName: 'Order ID', width: 300 },
        { field: 'Product_Id', headerName: 'Product Id', width: 200 },
        { field: 'Product_Name', headerName: 'Product Name', width: 300 },
        { field: 'Order_Quantity', headerName: 'Order Quantity', width: 150 },
        { field: 'Order_Due_Date', headerName: 'Due Date', width: 500 },
    ]

    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <div>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={orders}
                    columns={columns}
                    getRowId={(row) => row.Order_Id} // Use Order_Id as the unique id
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />

            </Paper>

            <Button size='large' variant='contained' onClick={handleDeliveryClick}>Deliver Order</Button>

            {message && <p>{message}</p>}
        </div>
    )
}

export default Vieworder
