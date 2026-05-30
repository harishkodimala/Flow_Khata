import exp from "express";
import { registerUser,loginUser,logoutUser} from "../controllers/authController.js";
export const authRouter = exp.Router();

authRouter.post("/register", registerUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/login", loginUser);
//route to handle page refresh and fetch current user data
authRouter.get("/me", (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });   
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }   
});