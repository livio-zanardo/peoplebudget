/**
 * @module jwt
 */
const fs = require("fs");
const jwt = require("jsonwebtoken");
const privateKey = fs.readFileSync(process.env.PRIVATEKEY);
var publicKey = fs.readFileSync(process.env.PUBLICKEY);
/**
 * This function will create a JWT Token with optional payload.
 * @name encode
 * @memberof module:jwt
 * @function
 * @param {Object} payload - Stores a payload inside of a token
 * @returns {Promise} Promise object represents a token string
 */
const encode = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, { algorithm: "RS256" }, function(err, token) {
      if (err) reject(err);
      else resolve(token);
    });
  });
};
/**
 * This function will return a payload if the token is still
 *  valid. Failing validity include expiration or tampering.
 * @name decode
 * @memberof module:jwt
 * @function
 * @param {String} token - Token with payload
 * @returns {Promise} Promise object represents a payload returned from a token.
 */
const decode = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, function(err, decoded) {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};
module.exports = { encode, decode };
