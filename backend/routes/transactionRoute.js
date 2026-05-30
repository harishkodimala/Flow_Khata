import exp from "express";

import {
  addTransaction,
  getTransactions
} from "../controllers/transactionController.js";

import { authenticateRole } from "../middleware/roleMiddleware.js";
import { verifyToken } from "../middleware/verifyToken.js";

 export const transactionRouter = exp.Router();

transactionRouter.post(
  "/add",
  verifyToken(),
  authenticateRole("SHOPKEEPER"),
  addTransaction
);

transactionRouter.get(
  "/:customerId",
  verifyToken(),
  authenticateRole("SHOPKEEPER", "CUSTOMER"),
  getTransactions
);
