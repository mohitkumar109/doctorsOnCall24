import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }, { limit: "16kb" }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

// routes import
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoutes.js";

// routes declaration
app.use("/api/v1/users", userRoute);

app.use(errorHandler);
export { app };
