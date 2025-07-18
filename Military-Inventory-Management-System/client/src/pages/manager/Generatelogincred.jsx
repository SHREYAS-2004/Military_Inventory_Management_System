import {useState} from "react";
import { Typography , TextField , Card , Button } from '@mui/material';
import axios from 'axios';

function Signup(){  
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    return(
        <div style={{
            backgroundImage : `url(/login-photo.jpg)`,
            width:"100vw",
            height:"100vh",
        }}>
            <div style={{
                paddingTop:150,
                display:"flex",
                justifyContent:"center",
                zIndex : 1,
                color : "white"
            }}>
                <Typography variant={'h4'}>
                    Please enter your Login details!
                </Typography><br/><br/>
            </div>

            <div style={{
                display:"flex",
                justifyContent:"center",
                padding:20
            }}>
                <Card variant="outlined" style={{
                    display : "flex", 
                    flexDirection : "column",
                    padding:15 , 
                    width:400 , 
                    height : 250, 
                    gap : 25
                }}>
                    <TextField 
                        fullWidth={true}
                        label="username" 
                        variant="outlined" 
                        style={{paddingBottom:8}}
                        onChange={(res)=>{
                            setEmail(res.target.value)
                        }}
                    />

                    <TextField 
                        fullWidth={true}
                        label="password" 
                        variant="outlined" 
                        type="password" 
                        style={{paddingBottom:8}}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />

                    <Button 
                        variant="contained"
                        size="large"

                        onClick={async()=>{
                            const res = await axios.post("http://localhost:3000/manager/signup",{
                                username : email,
                                password : password
                            },{
                                headers:{
                                    "Content-Type":"application/json"
                                }
                            })
                            const data = res.data;
                            localStorage.setItem("token",data.token)
                            window.location = "/"
                        }}                        
                        >Signup</Button>
                </Card>
            </div>
        </div>
    )
}

export default Signup;