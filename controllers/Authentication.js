/**
 * @module routes/auth
 */

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
router.post(`/register`, async (req, res) => {
  try {
    const {
      body: { fname, lname }
    } = req;
    console.log(fname, lname);
    const token = await encode({ fname, lname });
    res.cookie("token", token, { maxAge: 900000, httpOnly: true });
    res.statusCode = 201;
    res.send({ response: "you've got a token" });
  } catch (error) {
    res.send(err);
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
  res.send("refresh");
});
module.exports = { router, version: 1 };
