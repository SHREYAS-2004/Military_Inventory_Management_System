import React from 'react'
import { Typography,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function SupplierHome() {
    const navigate = useNavigate()

    return (
        <div className='home-container'>
            <div className="content-container">
                <Typography variant="h4" className="content">
                    To view all the Orders click here
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => { navigate("/supplier/orders") }}
                    className="custom-button"
                >
                    View Orders
                </Button>
            </div>

            <div className="content-container">
                <Typography variant="h4" className="content">
                    To Enter the price for your products click here
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => { navigate("/supplier/enterprice") }}
                    className="custom-button"
                >
                    Price entry
                </Button>
            </div>
        </div>
    )
}

export default SupplierHome
