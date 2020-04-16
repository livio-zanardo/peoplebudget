const reply = require("../models/reply");
const router = require("express").Router();
const { hash } = require("../helpers/hash");
const { customValidator } = require("../helpers/validator");
const { alreadyExists } = require("../helpers/database");
const { ClientError, ServerError } = require("../helpers/error");
const pagination = require("../helpers/pagination");

router.post("/", async (req, res, next) => {
  const validated = customValidator(req.body, {
    commentid: null,
    replybody: null,
  });
  if (validated !== 0) {
    next(validated);
    return;
  }
  const {
    body: { commentid, replybody },
  } = req;
  try {
    // Checking for duplicate replys?? <- from user crud
    /*
    await alreadyExists(reply, {
      replyBody: req.body.replybody
    });
    */

    const newReply = await reply.create({
      //(commentId)Change "C" to "c" to match reply model once reply model is merged
      CommentId: commentid,
      replyBody: replybody,
    });

    //res.header("Location", `api/user/v1/?id=${newUser.id}`)
    res.statusCode = 201; // Check for correct status code
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
          //(commentId)Change "C" to "c" to match reply model once reply model is merged
          exclude: ["id", "updatedAt"],
        },
      });
      if (!results) {
        next(new ClientError(400, `id ${req.query.id}doesn't exist`));
        return;
      }
    } else {
      results = await pagination(
        reply,
        { limit: req.query.limit, currentPage: req.query.page },
        {
          attributes: {
            //(commentId)Change "C" to "c" to match reply model once reply model is merged
            exclude: ["id", "updatedAt"],
          },
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
  console.log("My id is ", req.body.id);
  try {
    result = await reply.update(
      { ...req.body.reply },
      {
        where: { id: req.body.id },
      }
    );
    console.log("This is my update result: ", result)
    if (result.length === 1 && result[0] === 0) {
      next(new ClientError(400, `id ${req.body.id} doesn't exist`));
      return;
    }
    res.send({ response: "reply updated" });
  } catch (error) {
    next(error);
  }
});

// To do: Find which id's couldn't get deleted
router.delete("/", async (req, res, next) => {
  try {
    let result = null;
    if (!Array.isArray(req.body.id)) {
      result = await reply.destroy({
        where: { id: req.body.id },
      });
      if (!result) {
        next(new ClientError(400, `id ${req.body.id} doesn't exist`));
        return;
      }
      res.send(`reply ${req.body.id} deleted`);
    } else {
      result = await reply.destroy({
        where: { id: req.body.id },
      });
      if (!result) {
        next(
          new ClientError(400, `ids [${req.body.id.join(" , ")}] don't exist`)
        );
        return;
      }
      res.send({ response: `replies [${req.body.id.join(" , ")}] deleted` });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { router, version: 1 };
