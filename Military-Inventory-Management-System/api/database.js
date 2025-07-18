import mysql,{createConnection,createPool} from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const db = mysql.createPool({
    host: process.env.host ,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port : process.env.port,
    ssl: {
        rejectUnauthorized: false,
        ca : process.env.ca
    }
});

const db2 = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database2,
    port: process.env.port,
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.ca
    }
});



export  {db,db2}