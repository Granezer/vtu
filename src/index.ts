import express from 'express';
import { config } from '../config/default';

const app = express();

app.listen(8080, () => {
    console.log("App is running on port", config.port )
})