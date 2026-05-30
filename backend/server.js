import exp from "express";
import cors from "cors";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/authRoutes.js";
import { testRouter } from "./routes/testRoute.js";
import { customerRouter } from "./routes/customerRoute.js";
import { transactionRouter } from "./routes/transactionRoute.js";
import { dashboardRoutes } from "./routes/dashboardRoutes.js";
import { connectDB } from "./config/db.js";

config();

const app = exp();

connectDB();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));
app.use(exp.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/test", testRouter);
app.use("/customer", customerRouter);
app.use("/transaction", transactionRouter);
app.use("/dashboard", dashboardRoutes);

app.get("/test", (req, res) => {
    res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});