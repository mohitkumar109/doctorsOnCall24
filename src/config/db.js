import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connectDB = async () => {
    try {
        const connectingString = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}}`);
        console.log(`\n MongoDB is connected || DB HOST : ${connectingString.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection Error :", error);
        process.exit(1);
    }
};

export default connectDB;
