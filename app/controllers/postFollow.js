const postfollow = require('../models/postFollow');
const router = require('express').Router();
const { customValidator } = require('../helpers/validator');
const { ClientError } = require('../helpers/error');
const pagination = require('../helpers/pagination');

router.post('/', async (req, res, next) => {
    const validationError = customValidator(req.body, {
        followedPostId: null,
        followingUserId: null
    });
    if (validationError) {
        next(validationError);
        return;
    }
    try {
        const {
            body: { followedPostId, followingUserId }
        } = req;
        const followingUserIdList = await postfollow.findAll({
            where: {
                followingUserId: followingUserId
            }
        });
        for (const {
            dataValues: { followedPostId: _followedPostId }
        } of followingUserIdList) {
            if (_followedPostId === followedPostId) {
                next(
                    new ClientError(
                        400,
                        `User id '${followingUserId}' already follows post id '${followedPostId}'`
                    )
                );
            }
        }
        const newFollow = await postfollow.create({
            followedPostId: followedPostId,
            followingUserId: followingUserId
        });
        res.header('Location', `api/postfollow/v1/?id=${newFollow.id}`);
        res.statusCode = 201;
        res.send({ response: 'postfollow created' });
    } catch (error) {
        next(new ClientError(400, error.message));
    }
});
router.get('/', async (req, res, next) => {
    let results = null;
    try {
        if (req.query.hasOwnProperty('user')) {
            results = await postfollow.findAll({
                where: {
                    followingUserId: req.query.user
                },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'followingUserId']
                }
            });
        } else if (req.query.hasOwnProperty('id')) {
            results = await postfollow.findOne({
                where: { id: req.query.id },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            });
            if (!results) {
                next(new ClientError(400, `id '${req.query.id}' doesn't exist`));
                return;
            }
        } else if (req.query.hasOwnProperty('post')) {
            results = await postfollow.findAll({
                where: { followedPostId: req.query.post },
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'followedPostId']
                }
            });
            if (!results) {
                next(new ClientError(400, `Post id '${req.query.post}' doesn't exist`));
                return;
            }
        } else {
            results = await pagination(
                postfollow,
                { limit: req.query.limit, currentPage: req.query.page },
                {
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }
            );
        }
        res.send({ response: results });
    } catch (error) {
        next(error);
    }
});
router.put('/', async (req, res, next) => {
    let result = null;
    const validationError = customValidator(req.body, {
        id: null,
        followedPostId: null
    });
    if (validationError) {
        next(validationError);
        return;
    }
    try {
        const {
            body: { followedPostId }
        } = req;
        result = await postfollow.update(
            { followedPostId },
            {
                where: { id: req.body.id }
            }
        );
        if (result.length === 1 && result[0] === 0) {
            next(new ClientError(400, `id '${req.body.id}' doesn't exist`));
            return;
        }
        res.send({ response: 'follow info updated' });
    } catch (error) {
        next(error);
    }
});
router.delete('/', async (req, res, next) => {
    try {
        let result = null;
        if (!Array.isArray(req.body.id)) {
            result = await postfollow.destroy({
                where: { id: req.body.id }
            });
            if (!result) {
                next(new ClientError(400, `id '${req.body.id}' doesn't exist`));
                return;
            }
            res.send({ response: `Id '${req.body.id}' was deleted` }); // Tell User
        } else {
            result = await postfollow.destroy({
                where: { id: req.body.id }
            });
            if (!result) {
                next(new ClientError(400, `ids [${req.body.id.join(', ')}] don't exist`));
                return;
            }
            res.send({
                response: `follows [${req.body.id.join(', ')}] deleted`
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = { router, version: 1 };
