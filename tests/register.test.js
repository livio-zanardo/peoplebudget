const request = require("supertest");
const app = require("../app");
describe("Post Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/v1/register")
      .send({
        fname: "fname",
        lname: "lname"
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe("you've got a token");
  });
});
