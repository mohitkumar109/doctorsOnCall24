// Get Environment
const ENV_CONFIG = {
    dev: {
        BASE_URL: process.env.REACT_APP_BASE_URL_DEV,
    },
    staging: {
        BASE_URL: process.env.REACT_APP_BASE_URL_STAGING,
    },
    production: {
        BASE_URL: process.env.REACT_APP_BASE_URL_PRO,
    },
};

const getEnvironment = () => {
    const server = process.env.REACT_APP_SERVER;
    if (!server) {
        throw new Error("Environment variable is not defined");
    }
    return ENV_CONFIG[server];
};

export { getEnvironment };
