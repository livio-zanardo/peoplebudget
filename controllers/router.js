const router = require("express").Router();
// Authentication endpoints
const { router: Auth, version: AuthVersion } = require("./Authentication");
router.use(`/v${AuthVersion}/auth`, Auth);
const { router: User, version: UserVersion } = require("./user");
router.use(`/v${UserVersion}/user`, User);
const { router: Role, version: RoleVersion } = require("./role");
router.use(`/v${RoleVersion}/role`, Role);
const { router: PostFollow, version: PostFollowVersion } = require("./postfollow");
router.use(`/v${PostFollowVersion}/postfollow`, PostFollow);
const { router: Post, version: PostVersion } = require("./post");
router.use(`/v${PostVersion}/post`, Post);
const { router: Reply, version: ReplyVersion } = require("./reply");
router.use(`/v${RoleVersion}/reply`, Reply);
module.exports = router;
