
import express, { Router } from "express"

import { updateDoctor,getAllDoctor,deleteDoctor,getSingleDoctor, getDoctorProfile } from "../Controllers/doctorController.js"
import { authenticate,restrict } from "../auth/verifyToken.js"
import router_3 from "./review.js"


const router_2 = express.Router()

//nested route

router_2.use("/:doctorId/reviews",router_3)

router_2.get('/:id',getSingleDoctor)
router_2.get('/', getAllDoctor)
router_2.put('/:id',authenticate, restrict(['doctor']),updateDoctor)
router_2.delete('/:id',authenticate, restrict(['doctor']),deleteDoctor)
router_2.get('/profile/me',authenticate, restrict(['doctor']),getDoctorProfile)

export default router_2;