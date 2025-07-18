import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function SupplierList() {
  const [suppliers, setSuppliers] = useState([]); // State to store the suppliers

  // Fetch suppliers data from the backend when the component is mounted
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/manager/getSupplierdetails');
        setSuppliers(response.data); // Set the suppliers data to state
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        alert('Error fetching suppliers');
      }
    };

    fetchSuppliers();
  }, []); // Empty dependency array means this effect will run once when the component is mounted

  return (
    <div className="supplier-list">
      <Typography variant="h3" gutterBottom>
        List of Suppliers
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Supplier ID</TableCell>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Representative</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((Supplier) => (
              <TableRow key={Supplier.Supplier_Id}>
                <TableCell>{Supplier.Supplier_Id}</TableCell>
                <TableCell>{Supplier.Supplier_Name}</TableCell>
                <TableCell>{Supplier.Supplier_Location}</TableCell>
                <TableCell>{Supplier.Supplier_Country}</TableCell>
                <TableCell>{Supplier.Representative}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SupplierList;
