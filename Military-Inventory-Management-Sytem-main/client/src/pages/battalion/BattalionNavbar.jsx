import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function BattalionNavbar() {
    const navigate = useNavigate()
    return (
        <div className='adminnavbar' >
            <Link to={"/battalion"} className='link'><Typography variant='h5'>MIMS</Typography></Link>

            <div className='container'>
                <Link to={"/battalion/viewallocation"} className='link'><Typography variant='h5'>View Allocation</Typography></Link>

                <Link to={"/battalion/order"} className='link'><Typography variant='h5'>Order Resource</Typography></Link>
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

export default BattalionNavbar
