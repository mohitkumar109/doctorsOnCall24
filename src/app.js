import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();

const corsOptions = {
    origin: "http://localhost:3000", // replace with your frontend URL
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true, // Enable if you need to send cookies or authorization headers
    optionsSuccessStatus: 204,
};

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }, { limit: "16kb" }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors(corsOptions));

// routes import
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoutes.js";

// routes declaration
app.use("/api/v1/users", userRoute);

app.use(errorHandler);
export { app };
