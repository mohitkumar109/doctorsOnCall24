import { config as conf } from "dotenv";
conf({ path: ".env" });

const _config = {
    port: process.env.PORT,
    databaseUrl: process.env.MONGODB_URI,
    environment: process.env.NODE_ENV,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,
    frontendDomain: process.env.CORS_ORIGIN,
};

export const config = Object.freeze(_config);
