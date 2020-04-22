const comment = require("../models/comment");
const router = require("express").Router();
const { hash } = require("../helpers/hash");
const { customValidator } = require("../helpers/validator");
const { alreadyExists } = require("../helpers/database");
const { ClientError, ServerError } = require("../helpers/error");
const pagination = require("../helpers/pagination");

router.post("/", async (req, res, next) => {
  const validated = customValidator(req.body, {
    userid: null,
    postid: null,
    commentbody: null,
  });
  if (validated !== 0) {
    next(validated);
    return;
  }
  const {
    body: { userid, postid, commentbody }
  } = req;
  try {
    // await alreadyExists(user, {
    //   email: req.body.email
    // });

    const newComment = await comment.create({
      userid: userid,
      postid: postid,
      commentbody: commentbody
    });

    res.header("Location", `api/comment/v1/?id=${newComment.id}`)
    res.statusCode = 201;
    res.send({ response: "comment created" });
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  let results;

  try {
    if (req.query.hasOwnProperty("id")) {
      results = await comment.findOne({
        where: { id: req.query.id },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      });
      if (!results) {
        next(new ClientError(400, `id ${req.query.id}doesn't exist`));
        return;
      }
    } else if(req.query.hasOwnProperty("userid") ) {
        results = await comment.findAll({
           where: {
             userid: req.query.userid,
           },order: [
             ['createdAt', 'DESC']
         ],
           attributes: {
             exclude: ["createdAt","updatedAt","userid"],
           },
         });
      
      
    }
    else {
      results = await pagination(
        comment,
        { limit: req.query.limit, currentPage: req.query.page },
        {
          attributes: {
            exclude: ["createdAt", "updatedAt"],
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
  const validated = customValidator(req.body, {
    id: null, 
    commentbody: null,
  });
  if (validated !== 0) {
    next(validated);
    return;
  }
  try {
    const {
      body: { id,commentbody },
    } = req;
    result = await comment.update(
      { commentbody },
      {             
        where: { id: req.body.id },
      }
    );
    if (result.length === 1 && result[0] === 0) {   
      next(new ClientError(400, `id '${req.body.id}' doesn't exist`));
      return;
    }
    res.send({ response: "The comment has been updated" });
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => {
  let result = null;
  const validated = customValidator(req.body, {
    id: null, 
  });
  if (validated !== 0) {
    next(validated);
    return;
  }
  try {
    const {
      body: {id, postid, commentbody},
    } = req;
    result = await comment.destroy({
        where: { id: req.body.id }
      });
    if (result.length === 1 && result[0] === 0) {   
      next(new ClientError(400, `id '${req.body.id}' doesn't exist`));
      return;
    }
    res.send({ response: "The comment has been deleted successfully" });
  } catch (error) {
    next(error);
  }
  
});

module.exports = { router, version: 1 };
