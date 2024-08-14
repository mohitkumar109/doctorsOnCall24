import { Dependencies } from "../packages/index.js";
import { config, DB_NAME } from "./index.js";

const connectDB = async () => {
    try {
        const connectingString = await Dependencies.mongoose.connect(
            `${config.databaseUrl}/${DB_NAME}`
        );
        console.log(`\n MongoDB is connected || DB HOST : ${connectingString.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error :", error);
        process.exit(1);
    }
};

export { connectDB };
