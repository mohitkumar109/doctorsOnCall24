class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        if (typeof statusCode !== "number" || statusCode < 100 || statusCode >= 600) {
            throw new Error("Invalid HTTP status code");
        }
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
        Object.freeze(this);
    }
    toJson() {
        return JSON.stringify(this);
    }
}
export { ApiResponse };
