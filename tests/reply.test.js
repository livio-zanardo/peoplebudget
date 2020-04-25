const request = require("supertest");
const mysql = require("mysql2/promise");
const app = require("../app");

let testDBEntryId = null;
let testDBEntryIdUserAccesible = null;

const testJsonData = {
  commentId: 1,
  replyBody: "Test reply message",
};

const cleaningUpDatabase = async (done) => {
  console.log("Deleting all test data...");
  const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBROOTUSER,
    password: process.env.DBROOTPW,
    database: `${process.env.DB}_test`,
  });
  await connection.execute(`DELETE FROM replies`);
  await connection.end();
  done();
};

/**************************
  CRUD Operations Test
  ***************************/
describe("Reply API", () => {
  beforeAll(cleaningUpDatabase);
  // POST - CREATE
  describe("Create Reply Endpoint", () => {
    it("should post a new reply", async (done) => {
      const res = request(app).post("/api/reply/v1/").send(testJsonData);
      // Grab
      testDBEntryId = parseInt(res.header.dbrecordid.split("=")[1]);
      console.warn(res.header);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("response");
      expect(res.body.response).toBe("reply posted");
      done();
    });
    // User accessible post
    it("should post a new reply", async (done) => {
      const res = await request(app)
        .post("/api/reply/v1/reply/")
        .send(testJsonData);
      testDBEntryIdUserAccesible = parseInt(
        res.header.dbrecordid.split("=")[1]
      );
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("response");
      expect(res.body.response).toBe("reply posted");
      done();
    });
    // CREATE - neagative test cases
    it(`should receive client error if the "replybody" field is missing`, async (done) => {
      const testJsonBadData = { ...testJsonData };
      delete testJsonBadData.replyBody;
      //console.warn("Sending in", testJsonBadData);
      const res = await request(app)
        .post("/api/reply/v1/")
        .send(testJsonBadData);
      //console.log("Getting bqck", res.body);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("ClientError");
      expect(res.body.ClientError).toBe("Missing paramater 'replyBody' .");
      done();
    });
    it(`should receive client error if the "commentid" field is missing`, async (done) => {
      const testJsonBadData = { ...testJsonData };
      delete testJsonBadData.commentId;
      //console.log("Sending in", testJsonBadData);
      const res = await request(app)
        .post("/api/reply/v1/")
        .send(testJsonBadData);
      //console.log("Getting bqck", res.body);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("ClientError");
      expect(res.body.ClientError).toBe("Missing paramater 'commentId' .");
      done();
    });
  });
  console.error("G", testDBEntryId);
  // GET - READ
  describe("Read Reply Endpoint", () => {
    console.log("*********************READ**********************************");
    const testJsonDataResponse = { id: testDBEntryId, ...testJsonData };
    const testJsonDataResponseCopy = {
      id: testDBEntryIdUserAccesible,
      ...testJsonData,
    };
    let testReplyMissingId = 0;
    console.warn(
      "GET - testDBEntryId",
      testDBEntryId,
      testDBEntryIdUserAccesible
    );
    // returns single
    it("should get a single existing reply", async (done) => {
      const res = await request(app).get(`/api/reply/v1?id=${testDBEntryId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("response");
      expect(res.body.response).toStrictEqual(testJsonDataResponse);
      done();
    });
  });
  // returns multiple - take into account pagination
  it("should get multiple existing replies paginated", async (done) => {
    const testJsonDataResponsePagination = {
      count: 2,
      rows: [testJsonDataResponse, testJsonDataResponseCopy],
      maxPages: 1,
    };
    const res = await request(app).get(`/api/reply/v1/`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toStrictEqual(testJsonDataResponsePagination);
    done();
  });
  // READ - neagative test case - single
  it("should return client error specifying non-existant id", async (done) => {
    const res = await request(app).get(
      `/api/reply/v1?id=${testReplyMissingId}`
    );
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("ClientError");
    expect(res.body.ClientError).toStrictEqual(
      `reply with id[${testReplyMissingId}] does not exist`
    );
    done();
  });
  // PUT - Update
  describe("Update Reply Endpoint", () => {
    console.log(
      "*********************UPDATE**********************************"
    );
    let testReplyMissingId = testDBEntryId + 1;
    // UPDATE - neagative test case
    it("should return client error specifying non-existant id", async (done) => {
      const res = await request(app)
        .put(`/api/reply/v1/`)
        .send({
          id: testReplyMissingId,
          reply: {
            replyBody: "Test reply message",
          },
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("ClientError");
      expect(res.body.ClientError).toBe(
        `reply with id[${testReplyMissingId}] does not exist`
      );
      done();
    });
    it("should update a single existing reply", async (done) => {
      let res = await request(app).get(`/api/reply/v1/`);
      res = await request(app)
        .put(`/api/reply/v1/`)
        .send({
          id: testDBEntryId,
          reply: {
            replyBody: "Test reply message",
          },
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("response");
      expect(res.body.response).toBe(`reply with id[${testDBEntryId}] updated`);
      done();
    });
  });
  // DELETE - delete
  // single deletion
  describe("Delete Reply Endpoint", () => {
    console.log(
      "*********************DELETE**********************************"
    );
    let testReplyMissingId = testDBEntryId + 1;
    it("should delete a single existing reply", async (done) => {
      const res = await request(app)
        .delete(`/api/reply/v1/`)
        .send({ id: testDBEntryId });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("response");
      expect(res.body.response).toBe(`reply with id[${testDBEntryId}] deleted`);
      done();
    });
    // multiple deletion
    it("should delete multiple existing replies", async (done) => {
      const testSetupRes = await request(app)
        .post("/api/reply/v1/")
        .send(testJsonData);
      testDBEntryId = parseInt(testSetupRes.header.location.split("=")[1]);
      testJsonDataResponse.id = testDBEntryId;
      const res = await request(app)
        .delete(`/api/reply/v1/`)
        .send({ id: [testDBEntryId] });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("response");
      expect(res.body.response).toBe(
        `replies with ids[${testDBEntryId}] deleted`
      );
      done();
    });
    // DELETE - neagative test case - single
    it("should return client error specifying non-existant id", async (done) => {
      const res = await request(app)
        .delete(`/api/reply/v1/`)
        .send({ id: testReplyMissingId });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("ClientError");
      expect(res.body.ClientError).toBe(
        `reply with id[${testReplyMissingId}] does not exist`
      );
      done();
    });
    // DELETE - neagative test case - multiple
    it("should return client error specifying non-existant ids", async (done) => {
      const res = await request(app)
        .delete(`/api/reply/v1/`)
        .send({ id: [testReplyMissingId] });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("ClientError");
      expect(res.body.ClientError).toBe(
        `replies with ids[${testReplyMissingId}] does not exist`
      );
      done();
    });
  });
});
