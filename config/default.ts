import dotenv from 'dotenv';
import { loadVariables } from 'apitoolz';

dotenv.config();

const DEPLOYMENT_MODE = {
    DEV: 'development',
    PROD: 'production',
    TEST: 'test',
};

const NODE_ENV = process.env.NODE_ENV || DEPLOYMENT_MODE.DEV;

const currentDeployment = {
    isDev: NODE_ENV == DEPLOYMENT_MODE.DEV,
    isProduction: NODE_ENV == DEPLOYMENT_MODE.PROD,
    isTest: NODE_ENV == DEPLOYMENT_MODE.TEST,
};

const constants = loadVariables(
    {
        PORT: {
            required: currentDeployment.isProduction,
            default: () => (currentDeployment.isTest ? 0 : 5000),
            parser: (value: number) => (currentDeployment.isTest ? 0: value)
        },

        MONGODB_URI: {
            required: !currentDeployment.isTest,
            default: ""
        }
    }
)

export const config = {
    port: constants.PORT,
    db: {
        dbURI: constants.MONGODB_URI!
    }
}

export default config;