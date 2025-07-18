import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SupplierNavbar() {
    const navigate = useNavigate()
    return (
        <div className='adminnavbar' >
            <Link to={"/supplier"} className='link'><Typography variant='h5'>MIMS</Typography></Link>

            <div className='container'>
                <Link to={"/supplier/orders"} className='link'><Typography variant='h5'>View Orders</Typography></Link>
            </div>

            <div className='container'>
                <Link to={"/supplier/enterprice"} className='link'><Typography variant='h5'>Price Entry</Typography></Link>
            </div>

            <div className='container'>
                <Typography variant='h5'>{localStorage.getItem("username")}</Typography>
                <Button variant='contained' onClick={()=>{
                    localStorage.setItem("token",null)
                    localStorage.setItem("username",null)
                    navigate("/login")
                }}>Logout</Button>
            </div>

        </div>
    )
}

export default SupplierNavbar
