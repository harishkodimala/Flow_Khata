import exp from "express";

import {
  createCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
  deleteCustomer,
  resendCredentials,
  sendStatement,
  settleCustomer,
  sendContactMessage
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
customerRouter.put(

  "/settle/:customerId",

  verifyToken(),

  authenticateRole(
    "SHOPKEEPER"
  ),

  settleCustomer

);


customerRouter.get("/:id", verifyToken(), authenticateRole("SHOPKEEPER"), getCustomerById);
customerRouter.put(

  "/update/:id",

  verifyToken(),

  authenticateRole(
    "SHOPKEEPER"
  ),

  updateCustomer

);

customerRouter.delete(

  "/delete/:id",

  verifyToken(),

  authenticateRole(
    "SHOPKEEPER"
  ),

  deleteCustomer

);

customerRouter.post(

  "/resend-credentials/:id",

  verifyToken(),

  authenticateRole(
    "SHOPKEEPER"
  ),

  resendCredentials

);

customerRouter.post(

  "/send-statement/:id",

  verifyToken(),

  authenticateRole(
    "SHOPKEEPER"
  ),

  sendStatement

);


customerRouter.get(
  "/test",
  (req, res) => {
    res.json({
      message: "working"
    });
  }
);

customerRouter.post(
  "/contact/send",
  sendContactMessage
);