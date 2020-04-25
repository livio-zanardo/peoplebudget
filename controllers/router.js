const router = require("express").Router();
// Authentication endpoints
const { router: Auth, version: AuthVersion } = require("./Authentication");
router.use(`/v${AuthVersion}/auth`, Auth);
const { router: User, version: UserVersion } = require("./user");
router.use(`/user/v${UserVersion}`, User);
const { router: Role, version: RoleVersion } = require("./role");
router.use(`/role/v${RoleVersion}`, Role);
const { router: Comment, version: CommentVersion } = require("./comment");
router.use(`/comment/v${CommentVersion}`, Comment);
const { router: Reply, version: ReplyVersion } = require("./reply");
router.use(`/reply/v${RoleVersion}`, Reply);
module.exports = router;
