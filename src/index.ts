import { config } from '../config/default';
import cors from 'cors';
import connect from './utils/connect';
import log from './utils/logger';
import createServer from './utils/server';

const port = config.port;

const app = createServer();

app.use(cors({
    credentials: true
}))

app.listen(port, async () => {
    log.info(`App is running on http://localhost:${port}/`)

    await connect();
})
