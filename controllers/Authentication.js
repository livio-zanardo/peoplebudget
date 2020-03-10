/**
 * @module routes/auth
 */
const user = require("../models/user");
const { hash, compare } = require("../helpers/hash");

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
  //check if user exists
  if (!req.body.email) {
    next(new Error("Missing Email!"));
    return;
  }
  if (!req.body.fname) {
    next(new Error("Missing First Name!"));
    return;
  }
  if (!req.body.lname) {
    next(new Error("Missing Last Name!"));
    return;
  }
  if (!req.body.pass) {
    next(new Error("Missing Password!"));
    return;
  }
  if (!req.body.recover_pass) {
    next(new Error("Missing Recovery Password!"));
    return;
  }
  const {
    body: { email, fname, lname, pass, recover_pass }
  } = req;
  const existingUser = await user.findAll({
    where: {
      email: req.body.email
    }
  });
  // console.log(existingUser);
  if (existingUser.length === 0) {
    //create new user
    const newUser = await user.create({
      email: email,
      firstName: fname,
      lastName: lname,
      hash: await hash(pass),
      recoveryHash: await hash(recover_pass)
    });
    const token = await encode({ id: newUser.id, email: newUser.email });
    res.cookie("token", token, { maxAge: 900000, httpOnly: true });
    res.statusCode = 201;
    res.send({ response: "User registered!" });
  } else {
    next(new Error("User Already Exists!"));
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
