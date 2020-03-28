const request = require("supertest");
const mysql = require("mysql2/promise");
const app = require("../app");
const user = require("../models/user");
const role = require("../models/role");

const cleaningUpDatabase = async done => {
  console.log("Deleting all test data...");
  const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBROOTUSER,
    password: process.env.DBROOTPW,
    database: `${process.env.DB}_test`
  });
  await connection.execute(`DELETE FROM users`);
  await connection.end();
  done();
};
let testUserID = null;
const testJsonData = {
  email: "testUser001@email.com",
  fname: "nameFirst",
  lname: "nameLast",
  pass: "password",
  recover_pass: "securityResponse"
};
const testJsonDataResponse = {
  id: "",
  email: "testUser001@email.com",
  firstName: "nameFirst",
  lastName: "nameLast",
  RoleId: null
};
describe("User CRUD API", () => {
  beforeAll(cleaningUpDatabase);
  it("should create a user", async done => {
    const res = await request(app)
      .post("/api/user/v1/")
      .send(testJsonData);
    testUserID = res.header.location.split("=")[1];
    testJsonDataResponse.id = parseInt(testUserID);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe("user created");
    done();
  });
  it("should return all users", async done => {
    const res = await request(app).get(`/api/user/v1/`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toStrictEqual([testJsonDataResponse]);
    done();
  });
  it("should return one json file of a user", async done => {
    const res = await request(app).get(`/api/user/v1?id=${testUserID}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toStrictEqual(testJsonDataResponse);
    done();
  });
  it("should update fields of the user model based on keys in the request json file", async done => {
    const res = await request(app)
      .put(`/api/user/v1/`)
      .send({
        id: testUserID,
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
      .send({ id: [testUserID] });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe("users deleted");
    done();
  });
  // TODO: Add DELETE test case for deleting single use w/ no array
});
