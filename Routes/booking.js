import express, { Router } from "express"
import { authenticate,restrict } from "../auth/verifyToken.js"
import { getCheckoutSession } from "../Controllers/bookingController.js"

const router_4 = express.Router()

router_4.post('/checkout-session/:doctorId', authenticate , getCheckoutSession)

export default router_4

