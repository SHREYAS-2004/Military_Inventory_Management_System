import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from "axios";

function Enterprice() {
    const [price, setPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [warningMessage, setWarningMessage] = useState(""); // State for the warning message
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages from backend

    const username = localStorage.getItem("username");
    const supplierId = "SID_" + username.slice(-1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/supplier/products");
                console.log("Fetched Products:", response.data);
                setProducts(response.data); // Set the products state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);

        // Set a warning message if the price is less than 0
        if (value < 0) {
            setWarningMessage("Price cannot be less than 0.");
        } else {
            setWarningMessage(""); // Clear the warning message
        }
    };

    const handleSubmit = async () => {
        if (price < 0) {
            alert("Cannot submit. The price must be 0 or greater.");
            return;
        }

        try {
            console.log(selectedProduct);
            const response = await axios.post(`http://localhost:3000/supplier/enterprice`, {
                Supplier_Id: supplierId,
                Product_Id: selectedProduct,
                Price: price,
            });

            console.log("Price updated successfully");
            alert("Price updated successfully");
            setErrorMessage(""); // Clear any previous error message
        } catch (err) {
            if (err.response && err.response.status === 409) {
                // Handle supplier already exists case
                console.log("Error: Supplier already exists");
                setErrorMessage("Error: The supplier already exists for this product.");
            } else {
                console.log("Error in Updating price", err);
                setErrorMessage("Error: Could not update the price.");
            }
        }
    };

    return (
        <div className="priceEntry-container">
            <Card
                variant="outlined"
                style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}
                className="priceEntry-card"
            >
                <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Select
                        value={selectedProduct}
                        label="Product"
                        onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                        {products.length > 0 ? (
                            products.map((product) => (
                                <MenuItem key={product.Product_Id} value={product.Product_Id}>
                                    {product.Product_Name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value="">Loading...</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <TextField
                    label="Price"
                    variant="outlined"
                    fullWidth
                    value={price}
                    onChange={handlePriceChange}
                    style={{ marginBottom: '10px' }}
                />
                {warningMessage && (
                    <Typography color="error" style={{ marginBottom: '10px' }}>
                        {warningMessage}
                    </Typography>
                )}
                {errorMessage && (
                    <Typography color="error" style={{ marginBottom: '10px' }}>
                        {errorMessage}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    className="button"
                >
                    Submit
                </Button>
            </Card>
        </div>
    );
}

export default Enterprice;
