
import { useState, useEffect } from "react";
import { Typography, Button,Card, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from "axios";
import "../../style.scss";

function Additem({selectedProduct,setSelectedProduct,products,quantity,handleQuantityChange,error,allocatedQuantity,handleSubmit}){
    return (
        <div className="addItemcontainer">
            <Card className="itemcard">
                <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Select
                        value={selectedProduct}
                        label="Product"
                        onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                        {/* Check if products have been loaded */}
                        {products.length > 0 ? (
                            products.map((product) => (
                                <MenuItem key={product.Product_Id} value={product.Product_Id}>
                                    {product.Product_Name}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value="">Loading...</MenuItem> // Placeholder until products are loaded
                        )}
                    </Select>
                </FormControl>

                <TextField
                    label="Quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    fullWidth
                    error={!!error}
                    helperText={error || `Allocated Quantity: ${allocatedQuantity}`}
                />

                {/* Submit button */}
                <Button variant="contained" onClick={handleSubmit}>Submit Request</Button>
            </Card>
        </div>
    )
}

function Requestresource() {
    const username = localStorage.getItem("username");
    const BID = 'BID_' + username.slice(-1)

    const columns = [
        { field: 'ID', headerName: 'Pdt ID', width: 150 },
        { field: 'Name', headerName: 'Pdt Name', width: 400 },
        { field: 'quantity', headerName: 'Quantity', width: 150 },
    ];

    const [products, setProducts] = useState([]); // Holds the list of products fetched from the server
    const [selectedProduct, setSelectedProduct] = useState(""); // Holds the currently selected product
    const [quantity, setQuantity] = useState(""); // Holds the quantity the user wants to request
    const [allocatedQuantity, setAllocatedQuantity] = useState(0); // Holds the allocated quantity for the selected product
    const [requestResource, setRequestResource] = useState([]); // Holds the list of requests
    const [error, setError] = useState(""); // Holds any error messages
    const [view,setView] = useState(false)

    const paginationModel = { page: 0, pageSize: 5 };

    // Fetch products from the backend when the component is mounted
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/battalion/products");
                console.log("Fetched Products:", response.data);
                setProducts(response.data); // Set the products state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []); // Empty dependency array to fetch once when component mounts

    // Fetch allocated quantity when selectedProduct changes
    useEffect(() => {
        const fetchAllocatedQuantity = async () => {
            if (selectedProduct) {
                try {
                    const response = await axios.get(`http://localhost:3000/battalion/allocated-quantity/${BID}/${selectedProduct}`);
                    console.log("Fetched Allocated Quantity:", response.data);
                    setAllocatedQuantity(response.data.Allocated_Quantity); // Set allocated quantity
                } catch (error) {
                    console.error("Error fetching allocated quantity:", error);
                }
            }
        };
        fetchAllocatedQuantity();
    }, [selectedProduct, BID]); // Re-run the effect when selectedProduct changes

    const handleQuantityChange = (e) => {
        const enteredQuantity = e.target.value;
        setQuantity(enteredQuantity);

        // Check if the entered quantity exceeds the allocated quantity
        if (enteredQuantity > allocatedQuantity) {
            setError(`Requested quantity exceeds the available allocated quantity. Available: ${allocatedQuantity}`);
        } else {
            setError("");
        }
    };

    const handleCloseView = (e) => {
        // Close only if clicking on the overlay div itself
        if (e.target.value === e.currentTarget.value) {
            setView(false);
        }
    };

    const handleSubmit = async () => {
        if (!quantity || isNaN(quantity) || parseInt(quantity) <= 0) {
            setError("Please enter a valid quantity.");
            return;
        }
    
        try {
            const requestDate = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format
            const response = await axios.post("http://localhost:3000/battalion/order", {
                Battalion_Id: BID,
                Product_Id: selectedProduct,
                Requested_Quantity: quantity,
                Request_Date: requestDate
            });
    
            if (response.status === 201) {
                // Find the product name from the products array using the selectedProduct ID
                const selectedProductName = products.find(product => product.Product_Id === selectedProduct)?.Product_Name;
    
                alert("Request successfully added.");
                setQuantity("");  // Reset the quantity input field
                setRequestResource([...requestResource, { ID: selectedProduct, Name: selectedProductName, quantity: quantity }]);
            }
        } catch (error) {
            console.error("Error submitting request:", error);
            setError(error.response?.data || "An error occurred.");
        }
    };
    

    return (
        <div className="allocatecontainer" onClick={handleCloseView}>
            <div className="view-allocation" onClick={handleCloseView}>
                <Typography variant="h4">Enter details to Order</Typography>

                <div>
                    <Paper sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={requestResource}
                            columns={columns}
                            paginationModel={paginationModel}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            sx={{ border: 0 }}
                            getRowId={(row) => row.ID}
                        />
                    </Paper>
                </div>

                <Button variant="contained" onClick={() => {
                    setView(true)
                }}>Add item</Button>

                
                {view && <Additem selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} products={products} quantity={quantity} handleQuantityChange={handleQuantityChange} error={error} allocatedQuantity={allocatedQuantity} handleSubmit={handleSubmit}/>}
            </div>
        </div>
    );
}

export default Requestresource;
