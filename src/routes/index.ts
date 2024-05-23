import { createUserHandler } from "../controllers/user.controller";
import { Express, Request, Response } from "express";
import validate from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "../controllers/session.controller";
import { createSessionSchema } from "../schema/session.schema";
import requireUser from "../middleware/requireUser";
import { createAirtimeSchema } from "../schema/airtime.schema";
import { buyAirtimeProductHandler } from "../controllers/airtime.controller";
import { createDataSchema } from "../schema/data.schema";
import { buyDataProductHandler } from "../controllers/data.controller";

function routes(app: Express) {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.post('/api/users', validate(createUserSchema), createUserHandler);

    app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);

    app.get('/api/sessions', requireUser, getUserSessionsHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    app.post('/api/airtime', requireUser, [requireUser, validate(createAirtimeSchema)], buyAirtimeProductHandler);

    app.post('/api/data', requireUser, [requireUser, validate(createDataSchema)], buyDataProductHandler);
}



export default routes;