import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function BattalionList() {
  const [battalions, setBattalions] = useState([]); // State to store the battalion data

  // Fetch battalion data from the backend when the component is mounted
  useEffect(() => {
    const fetchBattalions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/manager/getbattaliondetails');
        setBattalions(response.data); // Set the battalions data to state
      } catch (error) {
        console.error('Error fetching battalions:', error);
        alert('Error fetching battalions');
      }
    };

    fetchBattalions();
  }, []); // Empty dependency array means this effect will run once when the component is mounted

  return (
    <div className="battalion-list">
      <Typography variant="h3" gutterBottom>
        List of Battalions
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Battalion ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Headquarters</TableCell>
              <TableCell>Colonel</TableCell>
              <TableCell>Number of Soldiers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {battalions.map((Battalion) => (
              <TableRow key={Battalion.Battalion_Id}>
                <TableCell>{Battalion.Battalion_Id}</TableCell>
                <TableCell>{Battalion.Name}</TableCell>
                <TableCell>{Battalion.Location}</TableCell>
                <TableCell>{Battalion.Headquarters}</TableCell>
                <TableCell>{Battalion.Colonel}</TableCell>
                <TableCell>{Battalion.Number_of_Soldiers}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default BattalionList;