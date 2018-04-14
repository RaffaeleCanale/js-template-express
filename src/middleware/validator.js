import Joi from 'joi';

function validate(keys, req, res, next) {
    return Joi.validate(req.body, Joi.object().keys(keys).unknown())
        .then(() => next())
        .catch(err => res.status(400).send(err.message));
}

export default keys => validate.bind(null, keys);
