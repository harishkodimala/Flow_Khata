import exp from "express";

import {
  getMyProfile,
  getMyTransactions,
  getDashboardData
} from "../controllers/dashboardController.js";

import { verifyToken } from "../middleware/verifyToken.js";
import { authenticateRole } from "../middleware/roleMiddleware.js";

export const dashboardRoutes = exp.Router();

dashboardRoutes.get(
  "/me",
  verifyToken(),
  authenticateRole("CUSTOMER"),
  getMyProfile
);

dashboardRoutes.get(
  "/transactions",
  verifyToken(),
  authenticateRole("CUSTOMER"),
  getMyTransactions
);

dashboardRoutes.get(
  "/shopkeeper",
  verifyToken(),
  authenticateRole("SHOPKEEPER"),
  getDashboardData
);
