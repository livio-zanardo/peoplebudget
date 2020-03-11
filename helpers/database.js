/**
 * @module database
 */
const { ClientError, ServerError } = require("../helpers/error");

/**
 * Will check is a resource already exists
 * @name alreadyExists
 * @function
 * @memberof module:database
 * @param {Function} dbModel - Database object function
 * @param {Object} query - Object used to query database
 * @returns {Promise} returns a promise that will resolve to be a Boolean or an Error object
 */
alreadyExists = (dbModel, query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await dbModel.findAll({
        where: query
      });
      res.length < 1
        ? resolve(true)
        : reject(
            new ClientError(
              400,
              `Type:'${dbModel.name}', with query params:[${Object.keys(
                query
              ).join(",")}], already exists.`
            )
          );
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  alreadyExists
};
