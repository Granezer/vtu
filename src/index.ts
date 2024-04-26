import express from 'express';
import { config } from '../config/default';
import cors from 'cors';
import connect from './utils/connect';
import log from './utils/logger';
import routes from './routes/index';
import deserializeUser from './middleware/deserializeUser';

const app = express();
const port = config.port;

app.use(cors({
    credentials: true
}))

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async () => {
    log.info(`App is running on http://localhost:${port}/`)

    await connect();

    routes(app);
})
