import { Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="content-container">
                <Typography variant="h4" className="content">
                    To Allocate the resource for every battalion, click the button
                </Typography>
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => { navigate("/admin/allocate") }}
                    className="custom-button"
                >
                    Allocate
                </Button>
            </div>

            <div className="content-container">
                <Typography variant="h4" className="content">
                    To view the report, click the button
                </Typography>
                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => { navigate("/admin/viewreport") }}
                    className="custom-button"
                >
                    Report
                </Button>
            </div>
        </div>
    );
}

export default AdminHome;
