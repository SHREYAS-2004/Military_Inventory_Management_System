import express from "express"
import { Router } from "express"
import { getAllocatedResource,getProducts,order } from "../controllers/battalion/orderResource.js"
import ViewAlloc from "../controllers/battalion/ViewAlloc.js"

const router = express.Router()


router.get("/allocation/:id",getAllocatedResource)

router.post("/order",order)

router.get("/allocated-quantity/:battalionId/:productId",getAllocatedResource)

router.get("/products",getProducts)

router.get("/viewAllocation/:B_Id",ViewAlloc)

export default router