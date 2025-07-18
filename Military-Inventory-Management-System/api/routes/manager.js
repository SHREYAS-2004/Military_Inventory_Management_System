import express from "express"

import { Router } from "express"
import Signup from "../controllers/manager/Signup.js"
import { getBattaliondetails, getProductdetails, getSupplierdetails } from "../controllers/manager/UserViews.js"
import addBattalion from "../controllers/manager/Battalionentry.js"
import addSupplier from "../controllers/manager/Supplierentry.js"
import addProduct from "../controllers/manager/Productentry.js"
import aggregatedOrder from "../controllers/manager/AggregatedOrder.js"
import FinalOrder from "../controllers/manager/FinalOrder.js"
import { generateOrderDetailsViewForDay } from "../controllers/manager/reportGeneration/Dayreport.js"
import { generateOrderDetailsViewForMonth } from "../controllers/manager/reportGeneration/MonthReport.js"
import { generateOrderDetailsViewForWeek } from "../controllers/manager/reportGeneration/WeekReport.js"
import { generateOrderDetailsViewForYear } from "../controllers/manager/reportGeneration/YearReport.js"
import { getOrderDetailsForView, listGeneratedViews } from "../controllers/admin/ViewReport.js"
import getOrders from "../controllers/manager/getOrders.js"

const router = express.Router()

router.get("/", (req, res, err) => {
    res.json("Hello from posts home")
})

router.post("/signup",Signup)

router.get("/getbattaliondetails",getBattaliondetails)

router.get("/getSupplierdetails",getSupplierdetails)

router.get("/getProductdetails",getProductdetails)

router.post("/addBattalion",addBattalion)

router.post("/addSupplier",addSupplier)

router.post("/addProduct",addProduct)

router.post("/aggregateOrder",aggregatedOrder)

router.post("/orderResources",FinalOrder)

// report generation
router.post("/generate-view/day",generateOrderDetailsViewForDay)
router.post("/generate-view/week",generateOrderDetailsViewForWeek)
router.post("/generate-view/month",generateOrderDetailsViewForMonth)
router.post("/generate-view/year",generateOrderDetailsViewForYear)

// report view routes
router.get("/generated-views",listGeneratedViews)
router.get("/view-data/:viewName",getOrderDetailsForView)

router.get("/getOrders",getOrders)


export default router