const router = require('express').Router();
const { router: Auth, version: AuthVersion } = require('./Authentication');
router.use(`/v${AuthVersion}/auth`, Auth);
const { router: User, version: UserVersion } = require('./user');
router.use(`/user/v${UserVersion}`, User);
const { router: Role, version: RoleVersion } = require('./role');
router.use(`/role/v${RoleVersion}`, Role);
const { router: UserFollow, version: UserFollowVersion } = require('./userfollow');
router.use(`/v${UserFollowVersion}/userfollow`, UserFollow);
const { router: Comment, version: CommentVersion } = require('./comment');
router.use(`/comment/v${CommentVersion}`, Comment);
const { router: PostFollow, version: PostFollowVersion } = require('./postfollow');
router.use(`/postfollow/v${PostFollowVersion}`, PostFollow);
const { router: Post, version: PostVersion } = require('./post');
router.use(`/post/v${PostVersion}`, Post);
const { router: Reply, version: ReplyVersion } = require('./reply');
router.use(`/reply/v${ReplyVersion}`, Reply);

module.exports = router;
