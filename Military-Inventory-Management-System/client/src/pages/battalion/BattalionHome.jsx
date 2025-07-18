import React from 'react'
import { Typography,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function BattalionHome() {
    const navigate = useNavigate()
    return (
        <div className='home-container'>
            <div className="content-container">
                <Typography variant="h4" className="content">
                    To view the allocated Quantity for all the Resources click here
                </Typography>
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => { navigate("/battalion/viewallocation") }}
                    className="custom-button"
                >
                    View Allocation
                </Button>
            </div>

            <div className="content-container">
                <Typography variant="h4" className="content">
                    To order Resources click here
                </Typography>
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => { navigate("/battalion/order") }}
                    className="custom-button"
                >
                    Order
                </Button>
            </div>
        </div>
    )
}

export default BattalionHome
