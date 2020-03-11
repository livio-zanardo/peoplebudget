/**
 * @module routes/auth
 */
const user = require("../models/user");
const { hash, compare } = require("../helpers/hash");
const { customValidator } = require("../helpers/validator");
const { alreadyExists } = require("../helpers/database");

/**
 * Express router to handle user authentication.
 * @type {object}
 * @const
 * @namespace authRouter
 */
const router = require("express").Router();
const { encode, decode } = require("../helpers/jwt");

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
  const validated = customValidator(req.body, {
    email: null,
    fname: null,
    lname: null,
    pass: null,
    recover_pass: null
  });

  //throw error is validation fails
  if (validated !== 0) {
    next(validated);
    return;
  }

  //destructure user input
  const {
    body: { email, fname, lname, pass, recover_pass }
  } = req;

  try {
    // check if user already exists
    await alreadyExists(user, {
      email: req.body.email
    });

    //create new user
    const newUser = await user.create({
      email: email,
      firstName: fname,
      lastName: lname,
      hash: await hash(pass),
      recoveryHash: await hash(recover_pass)
    });

    //create jwt token
    const token = await encode({ id: newUser.id, email: newUser.email });
    res.cookie("token", token, { maxAge: 900000, httpOnly: true });

    //send response
    res.statusCode = 201;
    res.send({ response: "User registered!" });
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
    const { cookies } = req;
    console.log(cookies);
    const decoded = await decode(cookies.token);
    res.send({ response: decoded });
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
    throw new Error("test error");
    res.send("logout");
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
router.post(`/refresh`, async (req, res) => {
  const newUser = await user.create({
    firstName: "test",
    lastName: "test",
    hash: "11111",
    recoveryHash: "11112"
  });
  console.log(newUser.id);
  res.send("refresh");
});
module.exports = { router, version: 1 };
