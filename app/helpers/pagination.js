/**
 * @module pagination
 */
/**
 * This function returns data from the database and paginates the result
 * @async
 * @function
 * @memberof module:pagination
 * @name pagination
 * @param {Object} model - sequelize model
 * @param {Object} page - has two keys limit(string) a number that decides the amount of records per page and page(string) is a number that decides which page to access
 * @param {Object} params - stores the query parameters for the database
 * @returns {Promise} is a promise that resolves a database object
 */
const pagination = async (model, page, params) => {
  let { limit, currentPage } = page;
  limit ? (limit = parseInt(limit)) : (limit = 10);
  currentPage ? (currentPage = parseInt(currentPage)) : (currentPage = 1);
  const table = await model.findAndCountAll({
    limit,
    offset: limit * (currentPage - 1),
    ...params
  });
  table.maxPages = Math.ceil(table.count / limit);
  return table;
};

module.exports = pagination;
