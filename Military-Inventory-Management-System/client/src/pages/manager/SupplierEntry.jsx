import React, { useState } from 'react';
import { Button, Card, TextField, Typography } from '@mui/material';
import axios from 'axios'; // For making HTTP requests

function SupplierEntry() {
  // Define state variables for each field
  const [supplierId, setSupplierId] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [supplierLocation, setSupplierLocation] = useState('');
  const [supplierCountry, setSupplierCountry] = useState('');
  const [representative, setRepresentative] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Prepare the data to be sent to the backend
      const supplierData = {
        supplier_id: supplierId,
        supplier_name: supplierName,
        supplier_location: supplierLocation,
        supplier_country: supplierCountry,
        representative: representative
      };

      // Send a POST request to the backend
      const response = await axios.post('http://localhost:3000/manager/addSupplier', supplierData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Handle the response
      if (response.status === 200) {
        alert('Supplier added successfully!');
        // Optionally clear the form after successful submission
        setSupplierId('');
        setSupplierName('');
        setSupplierLocation('');
        setSupplierCountry('');
        setRepresentative('');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Duplicate entry error
        setError('A supplier with this ID already exists.');
      } else {
        console.error('Error submitting the form:', error);
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="entry-container">
      <Typography variant="h3" gutterBottom>
        Enter the Supplier Details Here
      </Typography>

      <Card variant="outlined" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
        <TextField
          label="Supplier ID"
          variant="outlined"
          fullWidth
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Supplier Name"
          variant="outlined"
          fullWidth
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Supplier Location"
          variant="outlined"
          fullWidth
          value={supplierLocation}
          onChange={(e) => setSupplierLocation(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Supplier Country"
          variant="outlined"
          fullWidth
          value={supplierCountry}
          onChange={(e) => setSupplierCountry(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Representative"
          variant="outlined"
          fullWidth
          value={representative}
          onChange={(e) => setRepresentative(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        {error && (
          <Typography color="error" style={{ marginBottom: '10px' }}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
      </Card>
    </div>
  );
}

export default SupplierEntry;
