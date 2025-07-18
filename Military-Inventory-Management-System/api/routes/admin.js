import express from "express"

import { Router } from "express"
import Allocate from "../controllers/admin/Allocate.js"
import { listGeneratedViews,getOrderDetailsForView } from "../controllers/admin/ViewReport.js"

const router = express.Router()

router.get("/",(req,res,err)=>{
    res.json("Hello from posts home")
})

router.post("/allocate",Allocate)


// Route to list all generated views
router.get('/order-details/generated-views', listGeneratedViews);

// Route to fetch data for a specific view by name
router.get('/order-details/view-data/:viewName', getOrderDetailsForView);

export default router