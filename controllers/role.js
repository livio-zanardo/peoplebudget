const Role = require("../models/role");
const router = require("express").Router();
const { customValidator } = require("../helpers/validator");
const { alreadyExists } = require("../helpers/database");
const { ClientError, ServerError } = require("../helpers/error");
const pagination = require("../helpers/pagination");

router.post("/", async (req, res, next) => {
  const validated = customValidator(req.body, {
    role: null
  });
  if (validated !== 0) {
    next(validated);
    return;
  }
  const {
    body: { role }
  } = req;
  try {
    await alreadyExists(Role, {
      role: role
    });
    const newRole = await Role.create({
      role: role
    });
    res.header("Location", `api/role/v1/?id=${newRole.id}`);
    res.statusCode = 201;
    res.send({ response: "role created" });
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  let results;
  try {
    if (req.query.hasOwnProperty("id")) {
      results = await Role.findOne({
        where: { id: req.query.id }
      });
      if (!results) {
        next(new ClientError(400, `id ${req.query.id}doesn't exist`));
        return;
      }
    } else {
      results = await pagination(
        Role,
        { limit: req.query.limit, currentPage: req.query.page },
        {}
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
    result = await Role.update(
      { role: req.body.role },
      {
        where: { id: req.body.id }
      }
    );
    if (result.length === 1 && result[0] === 0) {
      next(new ClientError(400, `id ${req.body.id} doesn't exist`));
      return;
    }
    res.send({ response: "role info updated" });
  } catch (error) {
    next(error);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    let result = null;
    if (!Array.isArray(req.body.id)) {
      result = await Role.destroy({
        where: { id: req.body.id }
      });
      if (!result) {
        next(new ClientError(400, `id ${req.body.id} doesn't exist`));
        return;
      }
      res.send(`Role ${req.body.id} is deleted`); // Tell Role
    } else {
      result = await Role.destroy({
        where: { id: req.body.id }
      });
      if (!result) {
        next(
          new ClientError(400, `ids [${req.body.id.join(" , ")}] don't exist`)
        );
        return;
      }
      res.send({ response: "Roles deleted" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { router, version: 1 };
