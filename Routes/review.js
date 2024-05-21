import express from "express";
import { getAllReview, createReview } from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router_3 = express.Router({ mergeParams:true});

router_3
  .route("/")
  .get(getAllReview)
  .post(authenticate,restrict (['patient']),  createReview);

export default router_3;
