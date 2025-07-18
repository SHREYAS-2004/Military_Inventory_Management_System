import React, { useState } from 'react';
import { Button, Card, TextField, Typography } from '@mui/material';
import axios from 'axios'; // To make HTTP requests

function ProductEntry() {
  // Define state variables for each field
  const [productId, setProductId] = useState('');
  const [modelNo, setModelNo] = useState('');
  const [productName, setProductName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Prepare the data to be sent to the backend
      const productData = {
        product_id: productId,
        model_no: modelNo,
        product_name: productName,
        type: type,
        price: price
      };
  
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:3000/manager/addProduct', productData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      // Handle the response
      if (response.status === 200) {
        alert('Product added successfully!');
        // Optionally clear the form after successful submission
        setProductId('');
        setModelNo('');
        setProductName('');
        setType('');
        setPrice('');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle duplicate entry case
        alert('Product with this ID already exists!');
      } else {
        console.error('Error submitting the form:', error);
        alert('Error adding the product');
      }
    }
  };
  

  return (
    <div className="entry-container">
      <Typography variant="h3" gutterBottom>
        Enter the Product Details Here
      </Typography>

      <Card variant="outlined" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
        <TextField
          label="Product ID"
          variant="outlined"
          fullWidth
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Model No"
          variant="outlined"
          fullWidth
          value={modelNo}
          onChange={(e) => setModelNo(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Type"
          variant="outlined"
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginBottom: '20px' }}
        />

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

export default ProductEntry;
