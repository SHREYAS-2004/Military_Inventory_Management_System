import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home(){
    const navigate = useNavigate()
    return(
        <div className="home">
            <div className="homecontainer">
                <h3>MILITARY INVENTORY MANAGEMENT SYSTEM</h3>

                <Button variant="contained" size="large" onClick={()=> navigate("/login")}>Login here</Button>
            </div>
        </div>
    )
}

export default Home