/**
 * @module permissions
 */
const { decode } = require("../helpers/jwt");

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
  const decoded = await decode(req.cookies.token);
  if (decoded.role === "admin") next();
  else res.status(403).send({ response: "Access denied!" });
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
  if (decoded.role === "contributer") next();
  else res.status(403).send({ response: "Access denied!" });
};

module.exports = { adminRequired, contributerRequired };
