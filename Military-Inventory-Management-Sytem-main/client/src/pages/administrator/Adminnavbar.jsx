import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Adminnavbar() {
    const navigate = useNavigate()
    return (
        <div className='adminnavbar' >
            <Link to={"/admin"} className='link'><Typography variant='h5'>MIMS</Typography></Link>

            <div className='container'>
                <Link to={"/admin/allocate"} className='link'><Typography variant='h5'>Allocate resource</Typography></Link>

                <Link to={"/admin/viewreport"} className='link'><Typography variant='h5'>View Report</Typography></Link>
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

export default Adminnavbar
