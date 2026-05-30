import exp from "express";

import {
  createCustomer,
  getCustomers
} from "../controllers/customerController.js";
import { authenticateRole } from "../middleware/roleMiddleware.js";

import { verifyToken } from "../middleware/verifyToken.js";

export const customerRouter = exp.Router();

customerRouter.post(
  "/create",
  verifyToken(),
  authenticateRole("SHOPKEEPER"),
  createCustomer
);

customerRouter.get(
  "/all",
  verifyToken(),
  authenticateRole("SHOPKEEPER"),
  getCustomers
);
