import exp from "express";

import { verifyToken } from "../middleware/verifyToken.js";

export const testRouter = exp.Router();

testRouter.get(
  "/protected",
  verifyToken(),
  (req, res) => {

    res.json({
      message: "Protected route accessed",
      user: req.user
    });

  }
);
