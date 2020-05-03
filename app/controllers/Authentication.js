/**
 * @module routes/auth
 */
const user = require('../models/user');
const { hash, compare } = require('../helpers/hash');
const { customValidator } = require('../helpers/validator');
const { alreadyExists } = require('../helpers/database');
const { ClientError } = require('../helpers/error');

// testing it
const { adminRequired } = require('../middleware/requiredPermissions');

/**
 * Express router to handle user authentication.
 * @type {object}
 * @const
 * @namespace authRouter
 */
const router = require('express').Router();
const { encode, decode } = require('../helpers/jwt');

/**
 * Register API Controller.
 * @name auth/versionnumber/register[POST]
 * @memberof module:routes/auth~authRouter
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} controller - Express controller.
 */
router.post(`/register`, async (req, res, next) => {
    // valiate user input
    const validationError = customValidator(req.body, {
        email: null,
        fname: null,
        lname: null,
        pass: null,
        recover: null,
        address1: null,
        address2: null,
        securityQuestion: null
    });

    // throw error is validation fails
    if (validationError) {
        next(validationError);
        return;
    }

    // destructure user input
    const {
        body: {
            email,
            fname,
            lname,
            pass,
            recover,
            securityQuestion,
            roleid,
            linkedinurl,
            image,
            address1,
            address2,
            zip
        }
    } = req;

    try {
        // check if user already exists
        await alreadyExists(user, {
            email: email
        });

        // create new user
        await user.create({
            email: email,
            lastName: lname,
            firstName: fname,
            hash: await hash(pass),
            recoveryHash: await hash(recover),
            securityQuestion: securityQuestion,
            image: image,
            RoleId: roleid,
            address1: address1,
            address2: address2,
            zip: zip,
            linkedinurl: linkedinurl
        });

        // send response
        res.statusCode = 201;
        res.send({ response: 'User registered!' });
    } catch (error) {
        next(error);
    }
});

/**
 * Login API Controller.
 * @name auth/versionnumber/login[POST]
 * @memberof module:routes/auth~authRouter
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} controller - Express controller.
 */
router.post(`/login`, async (req, res) => {
    try {
        // destructure body
        const {
            body: { email, pass }
        } = req;
        console.log(email, pass);

        // find user based on email and password hash
        const aUser = await user.findOne({
            where: {
                email: email
            }
        });
        // check hash
        const passMatch = await compare(pass, aUser.hash);
        console.log(passMatch);

        if (passMatch) {
            // create jwt token
            const token = await encode({
                id: aUser.id,
                email: aUser.email,
                // role: aUser.role,
                role: 'admin', // testing user role logic
                exp: Math.floor(Date.now() / 1000) + 60 * 15 // 15 min expiration
            });
            res.cookie('token', token, { maxAge: 900000, httpOnly: true });
            res.send({ response: 'Login Successful!' });
        } else {
            next(new ClientError(400, 'Bad Username/Password.'));
        }
    } catch (error) {
        res.send(error);
    }
});

/**
 * logout API Controller.
 * @name auth/versionnumber/logout[POST]
 * @memberof module:routes/auth~authRouter
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} controller - Express controller.
 */
router.post(`/logout`, async (req, res, next) => {
    try {
        throw new Error('test error');
        res.send('logout');
    } catch (error) {
        next(error);
    }
});

/**
 * refresh API Controller.
 * @name auth/versionnumber/refresh[POST]
 * @memberof module:routes/auth~authRouter
 * @method
 * @inner
 * @param {string} path - Express path
 * @param {callback} controller - Express controller.
 */
router.post(`/refresh`, adminRequired, async (req, res) => {
    const decoded = await decode(req.cookies.token);
    console.log(decoded);
    res.send('refresh');
});
module.exports = { router, version: 1 };
