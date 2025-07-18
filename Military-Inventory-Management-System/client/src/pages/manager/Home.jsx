import React from 'react'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function ManagerHome() {
    const navigate = useNavigate()

    return (
        <div className='home-container'>
            <div className="content-container">
                <Typography variant="h4" className="content">
                    To Signup new user click here
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => { navigate("/manager/signup") }}
                    className="custom-button"
                >
                    Signup
                </Button>
            </div>

            <div className="content-container">
                <Typography variant="h4" className="content">
                    To order Resources click here
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => { navigate("/manager/order") }}
                    className="custom-button"
                >
                    Order
                </Button>
            </div>

            <div className="content-container">
                <Typography variant="h4" className="content">
                    To enter battalion details click here
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => { navigate("/manager/battalionentry") }}
                    className="custom-button"
                >
                    GO
                </Button>
            </div>

            <div className="content-container">
                <Typography variant="h4" className="content">
                    To enter product details click here
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => { navigate("/manager/productentry") }}
                    className="custom-button"
                >
                    GO
                </Button>
            </div>

            <div className="content-container">
                <Typography variant="h4" className="content">
                    To enter supplier details click here
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => { navigate("/manager/supplierentry") }}
                    className="custom-button"
                >
                    GO
                </Button>
            </div>

            <div className="content-container">
                <Typography variant="h4" className="content">
                    To View all the battalions click here
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => { navigate("/manager/viewbattalion") }}
                    className="custom-button"
                >
                    GO
                </Button>
            </div>

            <div className="content-container">
                <Typography variant="h4" className="content">
                    To View all the products click here
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => { navigate("/manager/viewproducts") }}
                    className="custom-button"
                >
                    GO
                </Button>
            </div>

            <div className="content-container">
                <Typography variant="h4" className="content">
                    To View all suppliers click here
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => { navigate("/manager/viewsupplier") }}
                    className="custom-button"
                >
                    GO
                </Button>
            </div>

            <div className="content-container">
                <Typography variant="h4" className="content">
                    To Generate report click here
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => { navigate("/manager/generateReport") }}
                    className="custom-button"
                >
                    GO
                </Button>
            </div>

        </div>

    )
}

export default ManagerHome
