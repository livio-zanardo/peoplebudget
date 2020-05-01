const user = require('../models/user');
const router = require('express').Router();
const { adminRequired } = require('../middleware/requiredPermissions');
const { hash } = require('../helpers/hash');
const { customValidator } = require('../helpers/validator');
const { alreadyExists } = require('../helpers/database');
const { ClientError } = require('../helpers/error');
const pagination = require('../helpers/pagination');

router.post('/', adminRequired, async (req, res, next) => {
    const validationError = customValidator(req.body, {
        email: { type: 'email', nullable: false },
        roleid: { type: 'alpha', nullable: false },
        linkedinurl: { nullable: true },
        image: { nullable: true },
        address1: { nullable: false },
        address2: { nullable: false },
        fname: { nullable: false, min: 2, max: 15 },
        lname: { nullable: false, min: 2, max: 15 },
        zip: { type: 'numeric', nullable: false },
        pass: { type: 'password', nullable: false },
        recover: { nullable: false, max: 30 }
    });
    if (validationError) {
        next(validationError);
        return;
    }
    const {
        body: {
            email,
            fname,
            lname,
            pass,
            recover,
            roleid,
            linkedinurl,
            image,
            address1,
            address2,
            zip
        }
    } = req;
    try {
        await alreadyExists(user, {
            email: req.body.email
        });
        const newUser = await user.create({
            email: email,
            lastName: lname,
            firstName: fname,
            hash: await hash(pass),
            recoveryHash: await hash(recover),
            image: image,
            RoleId: roleid,
            address1: address1,
            address2: address2,
            zip: zip,
            linkedinurl: linkedinurl
        });
        res.header('Location', `api/v1/user/?id=${newUser.id}`);
        res.statusCode = 201;
        res.send({ response: 'user created' });
    } catch (error) {
        next(error);
    }
});
router.get('/', adminRequired, async (req, res, next) => {
    let results;
    try {
        if (req.query.hasOwnProperty('id')) {
            results = await user.findOne({
                where: { id: req.query.id },
                attributes: {
                    exclude: ['hash', 'recoveryHash', 'createdAt', 'updatedAt']
                }
            });
            if (!results) {
                next(new ClientError(400, `id ${req.query.id}doesn't exist`));
                return;
            }
        } else {
            results = await pagination(
                user,
                { limit: req.query.limit, currentPage: req.query.page },
                {
                    attributes: {
                        exclude: ['hash', 'recoveryHash', 'createdAt', 'updatedAt']
                    }
                }
            );
        }
        res.send({ response: results });
    } catch (error) {
        next(error);
    }
});
router.put('/', adminRequired, async (req, res, next) => {
    let result = null;
    try {
        result = await user.update(
            { ...req.body.user },
            {
                where: { id: req.body.id }
            }
        );
        if (result.length === 1 && result[0] === 0) {
            next(new ClientError(400, `id ${req.body.id} doesn't exist`));
            return;
        }
        res.send({ response: 'user info updated' });
    } catch (error) {
        next(error);
    }
});
router.delete('/', adminRequired, async (req, res, next) => {
    try {
        let result = null;
        if (!Array.isArray(req.body.id)) {
            result = await user.destroy({
                where: { id: req.body.id }
            });
            if (!result) {
                next(new ClientError(400, `id ${req.body.id} doesn't exist`));
                return;
            }
            res.send(`User ${req.body.id}`); // Tell User
        } else {
            result = await user.destroy({
                where: { id: req.body.id }
            });
            if (!result) {
                next(new ClientError(400, `ids [${req.body.id.join(' , ')}] don't exist`));
                return;
            }
            res.send({ response: 'users deleted' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = { router, version: 1 };
