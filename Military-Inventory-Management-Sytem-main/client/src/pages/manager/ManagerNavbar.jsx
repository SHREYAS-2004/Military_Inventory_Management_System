import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ManagerNavbar() {
    const navigate = useNavigate()
    return (
        <div className='adminnavbar' >
            <Link to={"/manager"} className='link'><Typography variant='h5'>MIMS</Typography></Link>


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

export default ManagerNavbar
