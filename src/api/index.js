import _ from 'lodash';
import { Router } from 'express';

import facets from 'api/facets';

function endpoint(router, path, ...routes) {
    for (let i = 0; i < routes.length - 1; i += 1) {
        router.use(path, routes[i]);
    }

    _.forEach(routes[routes.length - 1], (fn, key) => {
        router[key](path, fn);
    });
}


export default ({ config, db }) => {
    const api = Router();
    const apiEndpoint = endpoint.bind(null, api);

    // mount the facets resource
    // api.use('/facets', facets({ config, db }));
    facets(apiEndpoint, { config, db });

    return api;
};
