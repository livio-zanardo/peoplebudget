const router = require("express").Router();
// Authentication endpoints
const { router: Auth, version: AuthVersion } = require("./Authentication");
router.use(`/auth/v${AuthVersion}`, Auth);
module.exports = router;
