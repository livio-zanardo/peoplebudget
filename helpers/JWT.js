const fs = require("fs");
const jwt = require("jsonwebtoken");
const privateKey = fs.readFileSync(process.env.PRIVATEKEY);
var publicKey = fs.readFileSync(process.env.PUBLICKEY);
/**
 * @name encode
 * @param {*} params 
 */
const encode = params => {
  return new Promise((resolve, reject) => {
    jwt.sign(params, privateKey, { algorithm: "RS256" }, function(err, token) {
      if (err) reject(err);
      else resolve(token);
    });
  });
};
/**
 * @name decode
 * @param {*} token 
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
