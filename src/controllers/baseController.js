const RES = {
    /** Sends a JSON response from the server */
    sendResponse: (res, body, data) => {
        body.data = data;
        res.status(body.httpCode).json(body);
    },

    /** Sends an error response and logs the error to the console */
    errorResponse: (res, err) => {
        console.error("ERROR:", err);
        res.status(400).json({ success: false, message: err.message || err, statusCode: 400 });
    },

    /** Sends an HTML response */
    sendHtml: (res, html) => {
        res.status(200).contentType("text/html").send(html);
    },
};

export { RES };
