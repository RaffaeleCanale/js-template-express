import bcrypt from 'bcrypt';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { getLogger } from 'js-utils/logger';

import validator from 'middleware/validator';

const logger = getLogger('auth');
const loginSchema = {
    hash: Joi.string().required(),
};

function generateToken(config) {
    const { secret, jwtExpiry } = config.auth;
    return jwt.sign({
        data: '',
    }, secret, { expiresIn: jwtExpiry });
}

export default (route, { config }) => {
    if (!config.auth) {
        return;
    }

    route('/login/token', {
        post: [
            validator(loginSchema),
            function post({ body }, res) {
                return bcrypt.compare(config.auth.password, body.hash)
                    .then((matches) => {
                        if (matches) {
                            return res.json({
                                token: generateToken(config),
                            });
                        }
                        return res.status(401).send('Wrong password');
                    })
                    .catch((err) => {
                        logger.error(err);
                        return res.status(500).send(err);
                    });
            },
        ],
    });
};
