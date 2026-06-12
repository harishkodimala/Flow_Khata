import {
  getShopkeepers,
    getAdminDashboard,
  getCustomers,
  deleteShopkeeper
} from "../controllers/adminController.js";
import exp from "express";
import {isAdmin,authenticateRole} from "../middleware/roleMiddleware.js";
import { verifyToken } from "../middleware/verifyToken.js";
export const adminRouter = exp.Router();

adminRouter.get("/dashboard",verifyToken(),authenticateRole("ADMIN"),getAdminDashboard);


adminRouter.get(
  "/shopkeepers",
  verifyToken(),
  authenticateRole("ADMIN"),
  getShopkeepers
);

adminRouter.get(
  "/customers",
  verifyToken(),
  authenticateRole("ADMIN"),
  getCustomers
);

adminRouter.delete(
  "/shopkeeper/:id",
  verifyToken(),
  authenticateRole("ADMIN"),
  deleteShopkeeper
);