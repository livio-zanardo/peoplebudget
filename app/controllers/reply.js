const reply = require("../models/reply");
const router = require("express").Router();
const { hash } = require("../helpers/hash");
const { customValidator } = require("../helpers/validator");
const { alreadyExists } = require("../helpers/database");
const { ClientError, ServerError } = require("../helpers/error");
const pagination = require("../helpers/pagination");

router.post("/", async (req, res, next) => {
    const validationError = customValidator(req.body, {
        commentId: null,
        replyBody: null
    });
    if (validationError) {
        next(validationError);
        return;
    }
    const {
        body: { commentid, replybody }
    } = req;
    try {
        const newReply = await reply.create({
            commentId: commentid,
            replyBody: replybody
        });
        let { createdAt } = newReply;
        res.header("Location", `api/reply/v1/?id=${newReply.id}`);
        res.statusCode = 201;
        res.send({ response: "reply posted" });
    } catch (error) {
        next(error);
    }
});
router.post("/reply/", async (req, res, next) => {
    const validationError = customValidator(req.body, {
        commentid: null,
        replybody: null
    });
    if (validationError) {
        next(validationError);
        return;
    }
    const {
        body: { commentid, replybody }
    } = req;
    try {
        const newReply = await reply.create({
            commentId: commentid,
            replyBody: replybody
        });
        let { createdAt } = newReply;
        res.header("Location", `api/reply/v1/?id=${newReply.id}`);
        res.statusCode = 201;
        res.send({ response: "reply posted" });
    } catch (error) {
        next(error);
    }
});
router.get("/", async (req, res, next) => {
    let results;
    try {
        if (req.query.hasOwnProperty("id")) {
            results = await reply.findOne({
                where: { id: req.query.id },
                attributes: {
                    exclude: ["updatedAt", "createdAt"]
                }
            });
            if (!results) {
                next(
                    new ClientError(
                        400,
                        `reply with id[${req.query.id}] does not exist`
                    )
                );
                return;
            }
        } else {
            results = await pagination(
                reply,
                { limit: req.query.limit, currentPage: req.query.page },
                {
                    attributes: {
                        exclude: ["updatedAt", "createdAt"]
                    }
                }
            );
        }
        res.send({ response: results });
    } catch (error) {
        next(error);
    }
});
router.put("/", async (req, res, next) => {
    let result = null;
    try {
        result = await reply.update(
            { ...req.body.reply },
            { where: { id: req.body.id } }
        );
        if (result.length === 1 && result[0] === 0) {
            next(
                new ClientError(
                    400,
                    `reply with id[${req.body.id}] does not exist`
                )
            );
            return;
        }
        res.send({ response: `reply with id[${req.body.id}] updated` });
    } catch (error) {
        next(error);
    }
});
router.delete("/", async (req, res, next) => {
    try {
        let result = null;
        if (!Array.isArray(req.body.id)) {
            result = await reply.destroy({
                where: { id: req.body.id }
            });
            if (!result) {
                next(
                    new ClientError(
                        400,
                        `reply with id[${req.body.id}] does not exist`
                    )
                );
                return;
            }
            res.statusCode = 200;
            res.send({ response: `reply with id[${req.body.id}] deleted` });
        } else {
            result = await reply.destroy({
                where: { id: req.body.id }
            });
            if (!result) {
                next(
                    new ClientError(
                        400,
                        `replies with ids[${req.body.id.join(
                            " , "
                        )}] does not exist`
                    )
                );
                return;
            }
            res.statusCode = 200;
            res.send({
                response: `replies with ids[${req.body.id.join(" , ")}] deleted`
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = { router, version: 1 };
