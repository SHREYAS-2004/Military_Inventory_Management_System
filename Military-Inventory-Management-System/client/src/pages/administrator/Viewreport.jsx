import { useState, useEffect } from 'react';
import axios from "axios";
import { Button, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

function AdminDashboard() {
    const [views, setViews] = useState([]);  // To hold the list of generated views
    const [selectedView, setSelectedView] = useState(null);  // To hold the selected view
    const [orderData, setOrderData] = useState(null);  // To hold the order data

    // Fetch all the generated views
    useEffect(() => {
        axios.get('http://localhost:3000/admin/order-details/generated-views')
            .then(response => {
                setViews(response.data);
            })
            .catch(error => {
                console.error('Error fetching views:', error);
            });
    }, []);

    // Fetch the data for the selected view
    const fetchViewData = (viewName) => {
        // Clear previous order data when a new view is selected
        setOrderData(null);
        setSelectedView(viewName);

        axios.get(`http://localhost:3000/admin/order-details/view-data/${viewName}`)
            .then(response => {
                setOrderData(response.data);
            })
            .catch(error => {
                console.error(`Error fetching order data for view ${viewName}:`, error);
            });
    };

    const columns = [
        { field: 'Order_Id', headerName: 'Order ID', width: 100 },
        { field: 'Product_Name', headerName: 'Product Name', width: 200 },
        { field: 'Order_Quantity', headerName: 'Quantity', width: 120 },
        { field: 'Price', headerName: 'Price', width: 120 },
        { 
            field: 'Order_Due_Date', 
            headerName: 'Due Date', 
            width: 150,
            valueGetter: (params) => new Date(params.value).toLocaleDateString() // Format the date
        }
    ];

    return (
        // <div>
        //     <h1>Admin Dashboard</h1>
        //     <h2>Generated Reports</h2>
        //     <ul>
        //         {views.map(view => (
        //             <li key={view.view_name}>
        //                 <button onClick={() => fetchViewData(view.view_name)}>
        //                     View {view.view_name} ({new Date(view.created_at).toLocaleDateString()})
        //                 </button>
        //             </li>
        //         ))}
        //     </ul>

        //     {orderData && (
        //         <div>
        //             <h2>Order Details for {selectedView}</h2>
        //             <table>
        //                 <thead>
        //                     <tr>
        //                         <th>Order ID</th>
        //                         <th>Product Name</th>
        //                         <th>Quantity</th>
        //                         <th>Price</th>
        //                         <th>Due Date</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {orderData.map(order => (
        //                         <tr key={order.Order_Id}>
        //                             <td>{order.Order_Id}</td>
        //                             <td>{order.Product_Name}</td>
        //                             <td>{order.Order_Quantity}</td>
        //                             <td>{order.Price}</td>
        //                             <td>{new Date(order.Order_Due_Date).toLocaleDateString()}</td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //         </div>
        //     )}
        // </div>

        // ----------------------------------------------------------

        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            <Typography variant="h5" gutterBottom>Generated Reports</Typography>

            <Box component="ul" sx={{ listStyle: 'none', paddingLeft: 0 }}>
                {views.map(view => (
                    <li key={view.view_name}>
                        <Button
                            variant="contained"
                            onClick={() => fetchViewData(view.view_name)}
                            sx={{ marginBottom: 1 }}
                        >
                            View {view.view_name} ({new Date(view.created_at).toLocaleDateString()})
                        </Button>
                    </li>
                ))}
            </Box>

            {orderData && (
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Order Details for {selectedView}
                    </Typography>
                    <DataGrid
                        rows={orderData}
                        columns={columns}
                        getRowId={(row) => row.Order_Id}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                    />
                </Box>
            )}
        </Box>
    );
}

export default AdminDashboard;
