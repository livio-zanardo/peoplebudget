const router = require("express").Router();
// Authentication endpoints
const { router: Auth, version: AuthVersion } = require("./Authentication");
router.use(`/auth/v${AuthVersion}`, Auth);
const { router: User, version: UserVersion } = require("./user");
router.use(`/user/v${UserVersion}`, User);
const { router: Role, version: RoleVersion } = require("./role");
router.use(`/role/v${RoleVersion}`, Role);
const { router: Comment, version: CommentVersion } = require("./comment");
router.use(`/comment/v${CommentVersion}`, Comment);
module.exports = router;
