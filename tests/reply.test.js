const request = require("supertest");
const app = require("../app");
const reply = require("../models/reply");

const prepareDatabase = (model) => async () => model.destroy({ where: {} });

const testJsonData = {
  commentId: 1,
  replyBody: "Test",
};

let testDBEntryId;

describe("Reply API", () => {
  beforeAll(prepareDatabase(reply));
  it("Can Post New Reply", async (done) => {
    request(app)
      .post("/api/reply/v1/")
      .send(testJsonData)
      .then(({ body, header, statusCode }) => {
        testDBEntryId = parseInt(header.dbrecordid.split("=")[1]);
        expect(statusCode).toEqual(201);
        expect(body).toHaveProperty("response");
        expect(body.response).toBe("reply posted");
        done();
      });
  });

  it("Can Update A Reply", async (done) => {
    request(app)
      .put("/api/reply/v1/")
      .send({
        id: testDBEntryId,
        reply: {
          replyBody: "Test reply message",
        },
      })
      .then(({ body, header, statusCode }) => {
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty("response");
        expect(body.response).toBe(`reply with id[${testDBEntryId}] updated`);
        done();
      });
  });

  it("Can Delete A Reply", async (done) => {
    request(app)
      .delete("/api/reply/v1/")
      .send({ id: [testDBEntryId] })
      .then(({ body, statusCode }) => {
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty("response");
        expect(body.response).toBe(
          `replies with ids[${testDBEntryId}] deleted`
        );
        done();
      });
  });
});
