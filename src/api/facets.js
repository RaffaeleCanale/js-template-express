import _ from 'lodash';

import facets from 'models/facets';

export default (route, { config, db }) => {

    route('/facets', {
        get(req, res) {
            return res.json(facets);
        },

        post({ body }, res) {
            body.id = facets.length.toString(36);
            facets.push(body);
            return res.json(body);
        },
    });

    route('/facets/:id', (req, res, next) => {
        const facet = facets.find(f => f.id === req.params.id);
        if (!facet) return res.status(404).send();

        req.facet = facet;
        return next();
    }, {
        get(req, res) {
            return res.json(req.facet);
        },

        put({ body, facet }, res) {
            const safeBody = _.omit(body, 'id');
            _.assign(facet, safeBody);

            return res.sendStatus(204);
        },

        delete({ facet }, res) {
            facets.splice(facets.indexOf(facet), 1);
            return res.sendStatus(204);
        },
    });
};
