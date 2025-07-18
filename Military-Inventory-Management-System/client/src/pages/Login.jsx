import { useState } from "react";
import { Typography, TextField, Card, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import "../style.scss"
import { useNavigate } from "react-router-dom"

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    let userType = '';
    const navigate = useNavigate();

    return (
        <div style={{
            backgroundImage: `url(/login-photo.jpg)`,
            width: "100vw",
            height: "100vh",
        }}>
            <div style={{
                paddingTop: 150,
                display: "flex",
                justifyContent: "center",
                zIndex: 1,
                color: "white"
            }}>
                <Typography variant={'h4'}>
                    Please enter your Login details!
                </Typography><br /><br />
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center",
                padding: 20
            }}>
                <Card variant="outlined" style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 15,
                    width: 400,
                    height: 250,
                    gap: 25
                }}>
                    <TextField
                        fullWidth={true}
                        label="username"
                        variant="outlined"
                        style={{ paddingBottom: 8 }}
                        onChange={(res) => {
                            setUsername(res.target.value);
                        }}
                    />

                    <TextField
                        fullWidth={true}
                        label="password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"} // Toggle type
                        style={{ paddingBottom: 8 }}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={async () => {
                            const type = username.slice(0, 2);

                            console.log("Username", username);
                            console.log(type);
                            switch (type) {
                                case 'BC':
                                    userType = 'battalion_commander';
                                    break;

                                case 'IM':
                                    userType = 'manager';
                                    break;

                                case 'SP':
                                    userType = 'supplier';
                                    break;

                                case 'AO':
                                    userType = 'admin';
                                    break;

                                default:
                                    alert("Wrong username");
                                    break;
                            }

                            try {
                                console.log(username);
                                console.log(password);
                                console.log(userType);
                                const res = await axios.post("http://localhost:3000/login", {
                                    username: username,
                                    password: password,
                                    type: userType,
                                }, {
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                });

                                const data = res.data;

                                localStorage.setItem("token", data.token);
                                localStorage.setItem("username", username);

                                switch (userType) {
                                    case 'battalion_commander':
                                        navigate("/battalion");
                                        break;

                                    case 'manager':
                                        navigate("/manager");
                                        break;

                                    case 'supplier':
                                        navigate("/supplier");
                                        break;

                                    case 'admin':
                                        navigate("/admin");
                                        break;

                                    default:
                                        break;
                                }
                            } catch (error) {
                                console.error("Login failed:", error);
                                alert("Login failed. Please check your credentials and try again.");
                            }
                        }}
                    >Login</Button>
                </Card>
            </div>
        </div>
    );
}

export default Signin;
