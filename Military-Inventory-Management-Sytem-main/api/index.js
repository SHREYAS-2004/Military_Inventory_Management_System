import express from "express"
import adminroutes from "./routes/admin.js"
import managerroutes from "./routes/manager.js"
import supplierroutes from "./routes/supplier.js"
import battalionroutes from "./routes/battalion.js"
import Login from "./controllers/Login.js"
const app = express()
import cors from "cors"

app.use(cors())


app.use(express.json())
app.use("/admin",adminroutes)
app.use("/manager",managerroutes)
app.use("/supplier",supplierroutes)
app.use("/battalion",battalionroutes)

app.post('/login', Login);

app.listen(3000,() => {
    console.log("Server started listening on port 3000")
})