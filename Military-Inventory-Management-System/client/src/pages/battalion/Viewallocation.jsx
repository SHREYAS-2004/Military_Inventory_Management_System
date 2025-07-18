import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

function Viewallocation() {
    const username = localStorage.getItem('username');
    const B_Id = 'BID_' + username.slice(-1);

    const [allocation, setAllocation] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3000/battalion/viewAllocation/${B_Id}`, {
                    headers: { 'Content-Type': 'application/json' },
                });

                console.log(response);
                setAllocation(response.data);
            } catch (error) {
                console.error('Error fetching allocation data:', error);
            }
        }

        fetchData();
    }, [B_Id]);

    const columns = [
        { field: 'Allocation_Id', headerName: 'Allocation ID', width: 200 },
        { field: 'Product_Id', headerName: 'Product ID', width: 200 },
        { field: 'Allocated_Quantity', headerName: 'Number of Resource Allocated', width: 200 },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <div>
            <Paper sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={allocation}
                    columns={columns}
                    getRowId={(row) => row.Allocation_Id} // Specify Allocation_Id as the unique id
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </div>
    );
}

export default Viewallocation;
