import { app } from "./app.js";
import { config, connectDB } from "./common/index.js";

const startServer = async () => {
    // Connect database
    await connectDB();
    const port = config.PORT || 8080;
    app.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
};

startServer();
