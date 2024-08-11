const asyncHandler = (requestHandler) => {
    if (typeof requestHandler !== "function") {
        throw new Error("requestHandler must be a function");
    }
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => {
            next(err);
        });
    };
};
export { asyncHandler };
