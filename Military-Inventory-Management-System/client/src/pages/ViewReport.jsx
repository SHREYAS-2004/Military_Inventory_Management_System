import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography
} from '@mui/material';
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios"

function ViewReport() {
    const [viewData,setViewData] = useState([])
    const location = useLocation()
    const viewname = location.state

    useEffect(() =>{
        async function viewReport (viewName){
            try {
                const response = await axios.get(`http://localhost:3000/manager/view-data/${viewName}`);
                setViewData(response.data)
            } catch (error) {
                console.error('Error fetching view data:', error);
                alert('Error fetching data for the selected view.');
            }
        }

        viewReport(viewname)
    },[])

    return (
        <div>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Order Report
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Order Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Order Due Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {viewData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.Order_Id}</TableCell>
                                <TableCell>{item.Product_Id}</TableCell>
                                <TableCell>{item.Product_Name}</TableCell>
                                <TableCell>{item.Order_Quantity}</TableCell>
                                <TableCell>{item.Price}</TableCell>
                                <TableCell>{new Date(item.Order_Due_Date).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ViewReport