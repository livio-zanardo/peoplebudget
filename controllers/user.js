const user = require("../models/user");
const router = require("express").Router();
const { hash } = require("../helpers/hash");
const { customValidator } = require("../helpers/validator");
const { alreadyExists } = require("../helpers/database");
const { ClientError, ServerError } = require("../helpers/error");
const pagination = require("../helpers/pagination");

router.post("/", async (req, res, next) => {
  const validated = customValidator(req.body, {
    email: null,
    fname: null,
    lname: null,
    pass: null,
    recover_pass: null
  });
  if (validated !== 0) {
    next(validated);
    return;
  }
  const {
    body: { email, fname, lname, pass, recover_pass }
  } = req;
  try {
    await alreadyExists(user, {
      email: req.body.email
    });

    const newUser = await user.create({
      email: email,
      firstName: fname,
      lastName: lname,
      hash: await hash(pass),
      recoveryHash: await hash(recover_pass)
    });

    res.statusCode = 201;
    res.send({ response: "User Created!" });
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  let results;
  console.log(req.query);
  try {
    if (req.query.hasOwnProperty("id")) {
      results = await user.findOne({
        where: { id: req.query.id },
        attributes: {
          exclude: ["hash", "recoveryHash", "createdAt", "updatedAt"]
        }
      });
      if (!results) {
        next(new ClientError(400, "ID doesn't exist"));
        return;
      }
    } else {
    
      results = await pagination(
        user,
        { limit: req.query.limit, currentPage: req.query.page },
        {
          attributes: {
            exclude: ["hash", "recoveryHash", "createdAt", "updatedAt"]
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
    console.log(req.body);
    result = await user.update(
      { ...req.body.user },
      {
        where: { id: req.body.id }
      }
    );
    if (result.length === 1 && result[0] === 0) {
      next(new ClientError(400, `ID #${req.body.id} doesn't exist`));
      return;
    }
    console.log("this is the result", result);
    res.send("done");
  } catch (error) {
    next(error);
  }
});

// To do: Find which id's couldn't get deleted
router.delete("/", async (req, res, next) => {
  try {
    let result = null;
    if (!Array.isArray(req.body.id)) {
      result = await user.destroy({
        where: { id: req.body.id }
      });
      if (!result) {
        next(new ClientError(400, `ID #${req.body.id} doesn't exist`));
        return;
      }
      res.send(`finshed deleting user ${req.body.id}`); // Tell User
    } else {
      result = await user.destroy({
        where: { id: req.body.id }
      });
      if (!result) {
        next(
          new ClientError(
            400,
            `ID # [${req.body.id.join(" , ")}] doesn't exist`
          )
        );
        return;
      }
      res.send({ response: "Users deleted" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { router, version: 1 };
