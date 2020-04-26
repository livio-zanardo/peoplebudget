/**
 * @module error
 */

/**
 * Status codes 400-499
 * @name ClientError
 * @class
 * @extends Error
 * @memberof module:error
 */
class ClientError extends Error {
  /**
   * @inner
   * @method
   * @param {Number} status - status code
   * @param  {...any} params - standard Error constructor parameters
   */
  constructor(status = "400", ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
    }

    this.name = "ClientError";
    // Custom debugging information
    this.status = status;
    this.date = new Date();
  }
}

/**
 * Status codes 500-599
 * @name ServerError
 * @class
 * @extends Error
 * @memberof module:error
 */
class ServerError extends Error {
  /**
   * @inner
   * @method
   * @param {Number} status - status code
   * @param  {...any} params - standard Error constructor parameters
   */
  constructor(status = "500", ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }

    this.name = "ServerError";
    // Custom debugging information
    this.status = status;
    this.date = new Date();
  }
}

module.exports = { ClientError, ServerError };
