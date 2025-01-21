import { Dependencies } from "../packages/index.js";
import { ApiError } from "../utils/index.js";

export const errorHandler = (err, req, res, next) => {
    let error = err;

    // Check if the error is an instance of an ApiError class which extends native Error class
    if (!(error instanceof ApiError)) {
        //if not
        //Create a new ApiError instance to keep the consistency

        //assign an appropriate status code
        const statusCode =
            error.statusCode || error instanceof Dependencies.mongoose.Error ? 400 : 500;

        //set a message from native Error instance or a custom one
        const message = error.message || "Something went wrong";
        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }

    //Now we are sure that the `error` variable will be an instance of ApiError class
    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
        // Error stack traces should be visible in development for debugging
    };
    //Send error response
    return res.status(error.statusCode).json(response);
};

export const InvalidRoute = (req, res, next) => {
    //console.log("invalid route",req.body,req.query,req)
    throw new ApiError(404, "invalid route");
};
