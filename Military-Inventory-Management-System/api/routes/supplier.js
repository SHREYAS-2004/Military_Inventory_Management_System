import express from "express"

import { Router } from "express"
import {deliverOrdersToHistory, getSupplierOrders} from "../controllers/supplier/ViewOrder.js"
import { getAllProducts,enterPrice } from "../controllers/supplier/Enterprice.js"

const router = express.Router()

router.get("/",(req,res,err)=>{
    res.json("Hello from posts home")
})

router.get("/viewOrder/:SID",getSupplierOrders)

router.post("/enterprice",enterPrice)

router.get("/products",getAllProducts)

router.post("/deliver-orders",deliverOrdersToHistory)

export default router