/**
 * @module routes/reply
 */
const Reply = require('../models/reply');
const { customValidator } = require('../helpers/validator');
const { ClientError } = require('../helpers/error');
const pagination = require('../helpers/pagination');
const router = require('express').Router();

/**
 * Reply API Controller.
 * @name reply/versionnumber[POST]
 * @memberof module:routes/reply~replyRouter
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} controller - Express controller.
 */
router.post('/', async (req, res, next) => {
    const validationError = customValidator(req.body, {
        commentId: { type: 'numeric' },
        replyBody: null // decide max char limit
    });
    if (validationError) {
        next(validationError);
        return;
    }
    const {
        body: { commentId, replyBody }
    } = req;
    try {
        console.log(req.body);
        const reply = await Reply.create({
            commentId,
            replyBody
        });
        res.header('Location', `api/v1/reply?id=${reply.id}`);
        res.statusCode = 201;
        res.send({ response: 'reply posted' });
    } catch (error) {
        next(error);
    }
});
/**
 * Reply API Controller.
 * @name reply/versionnumber/reply[POST]
 * @memberof module:routes/reply~replyRouter
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} controller - Express controller.
 */
router.post('/reply', async (req, res, next) => {
    const validationError = customValidator(req.body, {
        commentid: { type: 'numeric' },
        replybody: null // decide max char limit
    });
    if (validationError) {
        next(validationError);
        return;
    }
    const {
        body: { commentId, replyBody }
    } = req;
    try {
        const reply = await Reply.create({
            commentId,
            replyBody
        });
        res.header('Location', `api/v1/reply?id=${reply.id}`);
        res.statusCode = 201;
        res.send({ response: 'reply posted' });
    } catch (error) {
        next(error);
    }
});
/**
 * Reply API Controller.
 * @name reply/versionnumber[GET]
 * @memberof module:routes/reply~replyRouter
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} controller - Express controller.
 */
router.get('/', async (req, res, next) => {
    let results = null;
    try {
        if (req.query.hasOwnProperty('id')) {
            results = await Reply.findOne({
                where: { id: req.query.id },
                attributes: {
                    exclude: ['updatedAt', 'createdAt']
                }
            });
            if (!results) {
                next(new ClientError(400, `reply with id[${req.query.id}] does not exist`));
                return;
            }
        } else {
            results = await pagination(
                Reply,
                { limit: req.query.limit, currentPage: req.query.page },
                {
                    attributes: {
                        exclude: ['updatedAt', 'createdAt']
                    }
                }
            );
        }
        res.send({ response: results });
    } catch (error) {
        next(error);
    }
});
/**
 * Reply API Controller.
 * @name reply/versionnumber[PUT]
 * @memberof module:routes/reply~replyRouter
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} controller - Express controller.
 */
router.put('/', async (req, res, next) => {
    let result = null;
    try {
        result = await Reply.update({ ...req.body }, { where: { id: req.query.id } });
        if (result.length === 1 && result[0] === 0) {
            next(new ClientError(400, `reply with id[${req.query.id}] does not exist`));
            return;
        }
        res.send({ response: `reply with id[${req.query.id}] updated` });
    } catch (error) {
        next(error);
    }
});
/**
 * Reply API Controller.
 * @name reply/versionnumber[DELETE]
 * @memberof module:routes/reply~replyRouter
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} controller - Express controller.
 */
router.delete('/', async (req, res, next) => {
    try {
        let result = null;
        if (!Array.isArray(req.body.id)) {
            result = await Reply.destroy({
                where: { id: req.body.id }
            });
            if (!result) {
                next(new ClientError(400, `reply with id[${req.body.id}] does not exist`));
                return;
            }
            res.statusCode = 200;
            res.send({ response: `reply with id[${req.body.id}] deleted` });
        } else {
            result = await reply.destroy({
                where: { id: req.body.id }
            });
            if (!result) {
                next(
                    new ClientError(
                        400,
                        `replies with ids[${req.body.id.join(' , ')}] does not exist`
                    )
                );
                return;
            }
            res.statusCode = 200;
            res.send({
                response: `replies with ids[${req.body.id.join(' , ')}] deleted`
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = { router, version: 1 };
