const userfollow = require("../models/userFollow");
const router = require("express").Router();
const { hash } = require("../helpers/hash");
const { customValidator } = require("../helpers/validator");
const { alreadyExists } = require("../helpers/database");
const { ClientError, ServerError } = require("../helpers/error");
const pagination = require("../helpers/pagination");

router.post("/", async (req, res, next) => {
  const validated = customValidator(req.body, {
    followedUserId: {
      nullable:false, 
      type:'numeric'
    },
    followingUserId: {
      nullable:false,
      type:'numeric'
    }
  });
  if (validated !== true) {
    next(validated);
    return;
  }
    try {
      const {
        body: {followedUserId, followingUserId},
      } = req;

      const followingUserIdList = await userfollow.findAll({
        where: {
          followingUserId: followingUserId,
        },
      });

      for(const {
        dataValues: { followedUserId: _followedUserId}
      } of followingUserIdList){
        if(_followedUserId === followedUserId){
          next(new ClientError(400, `User ${followingUserId} is already following ${followedUserId}`)
          );
        }
      }
      const newUserFollow = await userfollow.create({
        followedUserId: followedUserId,
        followingUserId: followingUserId
      });
      res.header("Location", `api/userfollow/v1/?id=${newUserFollow.id}`)
      res.statusCode = 201;
      res.send({ response: "userfollow created" });
    } catch (error) {
      next(new ClientError(400, error.message))
    }
  });

  router.post("/follow", async (req, res, next) => {
    const validated = customValidator(req.body, {
      followedUserId: {
        nullable:false, 
        type:'numeric'
      },
      followingUserId: {
        nullable:false,
        type:'numeric'
      }
    });
    if (validated !== true) {
      next(validated);
      return;
    }
      try {
        const {
          body: {followedUserId, followingUserId},
        } = req;
  
        const followingUserIdList = await userfollow.findAll({
          where: {
            followingUserId: followingUserId,
          },
        });
  
        for(const {
          dataValues: { followedUserId: _followedUserId}
        } of followingUserIdList){
          if(_followedUserId === followedUserId){
            next(new ClientError(400, `User ${followingUserId} is already following ${followedUserId}`)
            );
          }
        }
        const newUserFollow = await userfollow.create({
          followedUserId: followedUserId,
          followingUserId: followingUserId
        });
        res.header("Location", `api/userfollow/v1/?id=${newUserFollow.id}`)
        res.statusCode = 201;
        res.send({ response: "userfollow created" });
      } catch (error) {
        next(new ClientError(400, error.message))
      }
    });

  router.get("/", async (req, res, next) => {
    let results = null;
    try {
      if (req.query.hasOwnProperty("user")) {
        results = await userfollow.findAll(
        {
          where: { followingUserId: req.query.user }, 
          order: [[`createdAt`, `DESC`]],
          attributes: {
            exclude: ["createdAt", "updatedAt", "followingUserId"],
          },
        });
        
      } else if (req.query.hasOwnProperty("id")) {
        results = await userfollow.findOne({
          where: { id: req.query.id },
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        });
        if (!results) {
          next(new ClientError(400, `id ${req.query.id} doesn't exist`));
          return;
        }
      } else {
      
        results = await pagination(
          userfollow,
          { limit: req.query.limit, currentPage: req.query.page },
          {
            attributes: {
              exclude: ["createdAt", "updatedAt"]
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
    const validated = customValidator(req.body, {
      id: {
      nullable:false, 
      type:'numeric'
    },
    followedUserId: {
      nullable:false,
      type:'numeric'
    }
    });
    if (validated !== true) {
      next(validated);
      return;
    }
    try {
      const{ body: { followedUserId } }= req;
      result = await userfollow.update(
        { followedUserId },
        {
          where: { id: req.body.id }
        }
      );
      if (result.length === 1 && result[0] === 0) {
        next(new ClientError(400, `id ${req.body.id} doesn't exist`));
        return;
      }
      res.send({response: "userfollow updated"});
    } catch (error) {
      next(error);
    }
  });
  
  router.delete("/", async (req, res, next) => {
    try {
      let result = null;
      if (!Array.isArray(req.body.id)) {
        result = await userfollow.destroy({
          where: { id: req.body.id }
        });
        if (!result) {
          next(new ClientError(400, `id ${req.body.id} doesn't exist`));
          return;
        }
        res.send({ response: `userfollow ${req.body.id} deleted`});
      } else {
        result = await userfollow.destroy({
          where: { id: req.body.id },
        });
        if (!result) {
          next(
            new ClientError(400, `ids [${req.body.id.join(", ")}] don't exist`)
          );
          return;
        }
        res.send({ response: `userfollows [${req.body.id.join(", ")}] deleted` });
      }
    } catch (error) {
      next(error);
    }
  });
  


module.exports = { router, version: 1 };