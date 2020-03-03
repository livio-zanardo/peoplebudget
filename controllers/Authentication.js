const router = require("express").Router();
const { encode, decode } = require("../helpers/JWT");
router
  .post(`/register`, async (req, res) => {
    try {
      const {
        body: { fname, lname }
      } = req;
      console.log(fname, lname);
      const token = await encode({fname, lname});
      res.cookie("token", token, { maxAge: 900000, httpOnly: true });
      res.send({ response: "you've got a token" });
    } catch (error) {
      res.send(err);
    }
  })
  .post(`/login`, async (req, res) => {
    try {
      const { cookies } = req;
      console.log(cookies);
      const decoded = await decode(cookies.token);
      res.send({ response: decoded });
    } catch (error) {
      res.send(error);
    }
  })
  .post(`logout`, async (req, res) => {
    res.send("logout");
  })
  .post(`refresh`, async (req, res) => {
    res.send("refresh");
  });
module.exports = { router, version: 1 };
