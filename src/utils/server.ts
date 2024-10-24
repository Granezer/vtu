import express from 'express';
import cors from 'cors';
import routes from '../routes/index';
import deserializeUser from '../middleware/deserializeUser';

function createServer() {
    const app = express();

    app.use(cors())
    
    
    app.use(express.json());
    
    app.use(deserializeUser);

    routes(app);

    return app;
}

export default createServer;
