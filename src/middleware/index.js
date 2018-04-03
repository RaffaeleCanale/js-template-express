import { Router } from 'express';
import jwt from 'express-jwt';

export default ({ config, db }) => {
    const routes = Router();

    if (config.secret) {
        routes.use(jwt({ secret: config.secret }));
    }

    return routes;
};
