import { Dependencies } from "./packages/index.js";
import { config } from "./common/index.js";

const app = Dependencies.express();
const corsOptions = {
    origin: config.frontendDomain, // replace with your frontend URL
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true, // Enable if you need to send cookies or authorization headers
    optionsSuccessStatus: 204,
};

app.use(Dependencies.express.json());
app.use(Dependencies.express.urlencoded({ extended: false }));
app.use(Dependencies.helmet());
app.use(Dependencies.helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(Dependencies.bodyParser.json());
app.use(Dependencies.bodyParser.urlencoded({ extended: false }));
app.use(Dependencies.express.static("public"));
app.use(Dependencies.cookieParser());
app.use(Dependencies.cors(corsOptions));

app.use((req, res, next) => {
    console.log("--------Request Details--------", req.method, req.originalUrl);
    console.log("authorization using headers--", req.header("Authorization"));
    console.log("authorization using cookies---", req.cookies["accessToken"]);
    Object.keys(req.body).length ? console.log("BODY : ", req.body) : "";
    Object.keys(req.query).length ? console.log("Query : ", req.query) : "";
    console.log("-----------ENDS------------");
    next();
});

// routes import
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRoute from "./routes/userRoutes.js";

// routes declaration
app.use("/api/v1/users", userRoute);

app.use(errorHandler);
export { app };
