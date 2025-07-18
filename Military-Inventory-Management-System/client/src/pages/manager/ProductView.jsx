import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function ProductList() {
  const [products, setProducts] = useState([]); // State to store the product data

  // Fetch product data from the backend when the component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/manager/getProductdetails');
        setProducts(response.data); // Set the products data to state
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Error fetching products');
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect will run once when the component is mounted

  return (
    <div className="product-list">
      <Typography variant="h3" gutterBottom>
        List of Products
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Model No</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((Product) => (
              <TableRow key={Product.Product_Id}>
                <TableCell>{Product.Product_Id}</TableCell>
                <TableCell>{Product.Model_No}</TableCell>
                <TableCell>{Product.Product_Name}</TableCell>
                <TableCell>{Product.Type}</TableCell>
                <TableCell>{Product.Price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductList;