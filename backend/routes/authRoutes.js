import exp from "express";
import { registerUser,loginUser,logoutUser,changePassword} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { User } from "../models/UserModel.js";
export const authRouter = exp.Router();

authRouter.post("/register", registerUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/login", loginUser);
authRouter.put("/change-password", verifyToken(), changePassword);

//route to handle page refresh and fetch current user data
authRouter.get("/me", verifyToken(), async (req, res) => {
    try {
        const user = await User.findById(req?.user?.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});