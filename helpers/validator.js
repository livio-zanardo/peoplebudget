/**
 * @module validator
 */

const validators = require("validator");
const { ClientError, ServerError } = require("../helpers/error");

/**
 * This will validate an object's keys
 * @name customValidator
 * @function
 * @memberof module:validator
 * @param {Object} body - Object with keys that need to be validated
 * @param {Object} params - An object that represents required keys and validation rules
 * @returns {Object|Number} returns Error object | returns 0 if is valid
 */
const customValidator = (body, params) => {
  for (const key in params) {
    if (body.hasOwnProperty(key)) {
      //do more validation here
    } else {
      return new ClientError(400, `Missing paramater '${key}' .`);
    }
  }
  return 0;
};

module.exports = { customValidator };
