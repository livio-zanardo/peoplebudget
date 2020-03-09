const router = require("express").Router();
// const {
//     isUser,
//     isContributer,
//     isAdmin,
// } = require('../middleware/Authentication')
// // include routes

// Authentication endpoints
const {
  router: Auth,
  version: AuthVersion
} = require("./Authentication");
router.use(`/auth/v${AuthVersion}`, Auth);
module.exports = router;
