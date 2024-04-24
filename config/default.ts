import dotenv from 'dotenv';
import { loadVariables } from 'apitoolz';
import { values } from 'lodash';

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
            parser: (value: number) => (currentDeployment.isTest ? 0 : value)
        },

        MONGODB_URI: {
            required: !currentDeployment.isTest,
            default: ""
        },

        SALT_WORK_FACTOR: {
            required: !currentDeployment.isTest,
            default: 10,
            parser: (value: number) => (currentDeployment.isDev ? 10 : Number(value))
        }
    }
)

export const config = {
    port: constants.PORT,
    db: {
        dbURI: constants.MONGODB_URI!
    },
    saltWorkFactor: constants.SALT_WORK_FACTOR
}

export default config;