/**
 * @module hash
 */

const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);

/**
 * Will create a one way hash from a string
 * @name hash
 * @async
 * @function
 * @memberof module:hash
 * @param {String} password - Password to create hash
 * @returns {Promise} returns a promise that will resolve into a hashed string
 */
const hash = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await bcrypt.hash(password, saltRounds);
            resolve(results);
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Compare a password from the client to a hashed password
 * @name compare
 * @async
 * @function
 * @memberof module:hash
 * @param {String} pwFromClient - Password from client
 * @param {String} pwFromStorage - Hashed password from database/storage
 * @returns {Promise}  returns a promise that will resolve into true or false
 */
const compare = async (pwFromClient, pwFromStorage) => {
    return new Promise(async (resolve, reject) => {
        try {
            const results = await bcrypt.compare(pwFromClient, pwFromStorage);
            resolve(results);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { hash, compare };
