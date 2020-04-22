const request = require("supertest");
const mysql = require("mysql2/promise");
const app = require("../app");
const comment = require("../models/comment");

const cleaningUpDatabase = async done => {
  console.log("Deleting all test data...");
  const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBROOTUSER,
    password: process.env.DBROOTPW,
    database: `${process.env.DB}_test`
  });
  await connection.execute(`DELETE FROM comments`);
  await connection.end();
  done();
};
let testCommentsID = null;
const testJsonData = {
  userid: 1,
  postid: 1,
  commentBody: "Hello"
};
const testJsonDataResponse = {
  id: "",
  userid: 1,
  postid: 1,
  commentBody: "Hello"
};
describe("Comments CRUD API", () => {
  beforeAll(cleaningUpDatabase);
  it("should create a comment", async done => {
    const res = await request(app)
      .post("/api/comment/v1/")
      .send(testJsonData);
    testCommentsID = parseInt(res.header.location.split("=")[1]);
    testJsonDataResponse.id = testCommentsID;
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe("comment created");
    done();
  });
  it("should return all comments", async done => {
    const res = await request(app).get(`/api/comment/v1/`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response.rows).toStrictEqual([testJsonDataResponse]);
    done();
  }); //Worked on
  it("should return one comment", async done => {
    const res = await request(app).get(`/api/comment/v1?id=${testCommentsID}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toStrictEqual(testJsonDataResponse);
    done();
  });
  it("should update fields of the user model based on keys in the request json file", async done => {
    const res = await request(app)
      .put(`/api/user/v1/`)
      .send({
        id: testCommentsID,
        user: {
          email: "newTestUser001@gmail.com",
          firstName: "nameLast",
          lastName: "nameFirst"
        }
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe("user info updated");
    done();
  });
  // TODO: Add PUT test case for roles changes
  it("should delete one user", async done => {
    const res = await request(app)
      .delete(`/api/user/v1`)
      .send({ id: [testCommentsID] });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe("users deleted");
    done();
  });
  // TODO: Add DELETE test case for deleting single use w/ no array
});
