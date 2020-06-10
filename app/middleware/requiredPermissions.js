/**
 * @module permissions
 */
const { decode } = require('../helpers/jwt');
const { ClientError } = require('../helpers/error');

/**
 *  this middleware Can be used to set permissions for end points
 * @name adminRequired
 * @async
 * @function
 * @memberof module:permissions
 * @param {Function} req
 * @param {Function} res
 * @param {Function} next
 */
const adminRequired = async (req, res, next) => {
    try {
        const decoded = await decode(req.cookies.token);
        if (decoded && decoded.role === 'admin') next();
        else res.status(403).send({ response: 'Access denied!' });
    } catch (err) {
        next(new ClientError(401, 'Token Expired!'));
    }
};

/**
 *  this middleware Can be used to set permissions for end points
 * @name contributerRequired
 * @async
 * @function
 * @memberof module:permissions
 * @param {Function} req
 * @param {Function} res
 * @param {Function} next
 */
const contributerRequired = async (req, res, next) => {
    const decoded = await decode(req.cookies.token);
    if (decoded && decoded.role === 'contributer') next();
    else res.status(403).send({ response: 'Access denied!' });
};

module.exports = { adminRequired, contributerRequired };
