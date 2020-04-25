const request = require("supertest");
const app = require("../app");
const reply = require("../models/reply");

const prepareDatabase = (model) => async () => model.destroy({ where: {} });

let testDBEntryId = null;
const testDBMissingId = null;

const testJsonData = {
  commentId: 1,
  replyBody: "Test",
};
const testJsonDataResponse = {
  id: null, // Value assigned during testing
  ...testJsonData,
};

describe("Reply API", () => {
  beforeAll(prepareDatabase(reply));
  /*****************************
  CRUD Testing - ADMIN
 *******************************/
  // CREATE - post
  it("Can Post New Reply", async (done) => {
    request(app)
      .post("/api/reply/v1/")
      .send(testJsonData)
      .then(({ body, header, statusCode }) => {
        testDBEntryId = parseInt(header.location.split("=")[1]);
        expect(statusCode).toEqual(201);
        expect(body).toHaveProperty("response");
        expect(body.response).toBe("reply posted");
        done();
      });
  });
  // CREATE - Error Testing
  it(`Returns Error Specifying Missing Parameter(replyBody)`, async (done) => {
    const testJsonBadData = { commentId: testJsonData.commentId };
    request(app)
      .post("/api/reply/v1/")
      .send(testJsonBadData)
      .then(({ body, statusCode }) => {
        expect(statusCode).toEqual(400);
        expect(body).toHaveProperty("ClientError");
        expect(body.ClientError).toBe("Missing paramater 'replyBody' .");
        done();
      });
  });
  it(`Returns Error Specifying Missing Parameter(commentId)`, async (done) => {
    const testJsonBadData = { replyBody: testJsonData.replyBody };
    request(app)
      .post("/api/reply/v1/")
      .send(testJsonBadData)
      .then(({ body, statusCode }) => {
        expect(statusCode).toEqual(400);
        expect(body).toHaveProperty("ClientError");
        expect(body.ClientError).toBe("Missing paramater 'commentId' .");
        done();
      });
  });
  // READ - get
  it("Can GET A Reply", async (done) => {
    testJsonDataResponse.id = testDBEntryId;
    request(app)
      .get(`/api/reply/v1?id=${testDBEntryId}`)
      .then(({ body, statusCode }) => {
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty("response");
        expect(body.response).toStrictEqual(testJsonDataResponse);
        done();
      });
  });
  it("Can GET Replies Paginated", async (done) => {
    const testJsonDataResponsePagination = {
      count: 1,
      rows: [testJsonDataResponse],
      maxPages: 1,
    };
    request(app)
      .get(`/api/reply/v1`)
      .then(({ body, statusCode }) => {
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty("response");
        expect(body.response).toStrictEqual(testJsonDataResponsePagination);
        done();
      });
  });
  // READ - Error Testing
  it("Returns Error Specifying Missing Id", async (done) => {
    request(app)
      .get(`/api/reply/v1?id=${testDBMissingId}`)
      .then(({ body, statusCode }) => {
        expect(statusCode).toEqual(400);
        expect(body).toHaveProperty("ClientError");
        expect(body.ClientError).toStrictEqual(
          `reply with id[${testDBMissingId}] does not exist`
        );
        done();
      });
  });
  // UPDATE - put
  it("Can Update A Reply", async (done) => {
    request(app)
      .put("/api/reply/v1/")
      .send({
        id: testDBEntryId,
        reply: {
          replyBody: "Test reply message",
        },
      })
      .then(({ body, statusCode }) => {
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty("response");
        expect(body.response).toBe(`reply with id[${testDBEntryId}] updated`);
        done();
      });
  });
  // UPDATE - Error Testing
  it("Returns Error Specifying Missing Id", async (done) => {
    const res = await request(app)
      .put(`/api/reply/v1/`)
      .send({
        id: testDBMissingId,
        reply: {
          replyBody: "Test reply message",
        },
      })
      .then(({ body, statusCode }) => {
        expect(statusCode).toEqual(400);
        expect(body).toHaveProperty("ClientError");
        expect(body.ClientError).toBe(
          `reply with id[${testDBMissingId}] does not exist`
        );
        done();
      });
  });
  // DELETE - del
  it("Can Delete A Reply", async (done) => {
    request(app)
      .delete("/api/reply/v1/")
      .send({ id: testDBEntryId })
      .then(({ body, statusCode }) => {
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty("response");
        expect(body.response).toBe(`reply with id[${testDBEntryId}] deleted`);
        done();
      });
  });
  it("Can Delete Replies", async (done) => {
    const testSetupRes = await request(app)
      .post("/api/reply/v1/")
      .send(testJsonData);
    testDBEntryId = parseInt(testSetupRes.header.location.split("=")[1]);
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
  /***************************************
  CRUD Testing - USER ACCESIBLE
 *****************************************/
  // CREATE - post
  it("Can Post New Reply", async (done) => {
    request(app)
      .post("/api/reply/v1/reply")
      .send(testJsonData)
      .then(({ body, header, statusCode }) => {
        testDBEntryId = parseInt(header.location.split("=")[1]);
        expect(statusCode).toEqual(201);
        expect(body).toHaveProperty("response");
        expect(body.response).toBe("reply posted");
        done();
      });
  });
});
