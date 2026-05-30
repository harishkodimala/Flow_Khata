import exp from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes/authRoutes.js";
import { testRouter } from "./routes/testRoute.js";
import { customerRouter } from "./routes/customerRoute.js";
import { transactionRouter } from "./routes/transactionRoute.js";
import { dashboardRoutes } from "./routes/dashboardRoutes.js";
import { settingsRouter } from "./routes/settingRoutes.js";

import { connectDB } from "./config/db.js";

config();

const app = exp();

// Important for Render / Reverse Proxy
app.set("trust proxy", 1);

// Database Connection
connectDB();

// Allowed Origins

const allowedOrigins = [

    process.env.CLIENT_URL,

    "http://localhost:5173"

];

console.log("CLIENT_URL:", process.env.CLIENT_URL);
console.log("Allowed Origins:", allowedOrigins);

// Middleware

app.use(

    cors({

        origin: function (
            origin,
            callback
        ) {

            if (!origin) {

                return callback(
                    null,
                    true
                );

            }

            if (

                allowedOrigins.includes(
                    origin
                ) ||

                /^http:\/\/localhost(:\d+)?$/.test(
                    origin
                )

            ) {

                return callback(
                    null,
                    true
                );

            }

            return callback(

                new Error(
                    "Not allowed by CORS"
                )

            );

        },

        credentials: true

    })

);

app.use(exp.json());

app.use(cookieParser());

// Routes

app.use(
    "/auth",
    authRouter
);

app.use(
    "/test",
    testRouter
);

app.use(
    "/customer",
    customerRouter
);

app.use(
    "/transaction",
    transactionRouter
);

app.use(
    "/dashboard",
    dashboardRoutes
);

app.use(
    "/settings",
    settingsRouter
);

// Health Check Route

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message:
            "Khata Flow API Running"

    });

});

// 404 Handler

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message:
            "Route not found"

    });

});

// Global Error Handler

app.use(

    (
        err,
        req,
        res,
        next
    ) => {

        console.error(
            err.message
        );

        // CORS

        if (

            err.message ===
            "Not allowed by CORS"

        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Access denied"

            });

        }

        // Invalid Mongo ObjectId

        if (

            err.name ===
            "CastError"

        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid resource ID"

            });

        }

        // Validation Error

        if (

            err.name ===
            "ValidationError"

        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Validation failed"

            });

        }

        // JWT Error

        if (

            err.name ===
            "JsonWebTokenError"

        ) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid token"

            });

        }

        // Expired Token

        if (

            err.name ===
            "TokenExpiredError"

        ) {

            return res.status(401).json({

                success: false,

                message:
                    "Session expired"

            });

        }

        // Default Error

        return res.status(

            err.statusCode || 500

        ).json({

            success: false,

            message:

                process.env
                    .NODE_ENV ===
                "production"

                    ? "Internal Server Error"

                    : err.message

        });

    }

);

const PORT =
    process.env.PORT ||
    5000;

app.listen(PORT, () => {

    console.log(

        `Server running on port ${PORT}`

    );

});