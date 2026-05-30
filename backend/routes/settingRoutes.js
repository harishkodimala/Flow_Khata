import exp from "express";

import {

  getProfile,

  updateProfile,

  changePassword

} from "../controllers/settingsController.js";

import { verifyToken }
from "../middleware/verifyToken.js";

import {
  authenticateRole
}
from "../middleware/roleMiddleware.js";

export const settingsRouter =
  exp.Router();

settingsRouter.get(

  "/profile",

  verifyToken(),

  authenticateRole(
    "SHOPKEEPER"
  ),

  getProfile

);

settingsRouter.put(

  "/profile",

  verifyToken(),

  authenticateRole(
    "SHOPKEEPER"
  ),

  updateProfile

);

settingsRouter.put(

  "/change-password",

  verifyToken(),

  authenticateRole(
    "SHOPKEEPER"
  ),

  changePassword

);