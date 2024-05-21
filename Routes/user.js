import express from "express";
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router_1 = express.Router();

router_1.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
router_1.get("/", authenticate, restrict(["admin"]), getAllUser);
router_1.put("/:id", authenticate, restrict(["patient"]), updateUser);
router_1.delete("/:id", authenticate, restrict(["patient"]), deleteUser);
router_1.get(
  "/profile/me",
  authenticate,
  restrict(["patient"]),
  getUserProfile
);
router_1.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

export default router_1;
