const request = require("supertest");
const mysql = require("mysql2/promise");
const app = require("../app");
const user = require("../models/userfollow");


const cleaningUpDatabase = async done => {
  console.log("Deleting all test data...");
  const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBROOTUSER,
    password: process.env.DBROOTPW,
    database: `${process.env.DB}_test`
  });
  await connection.execute(`DELETE FROM userfollows`);
  await connection.end();
  done();
};
let testUserFollowID = null;
const testUserFollow = {
  followedUserId: "11",
  followingUserId: "15"
};
const testJsonDataResponse = {
id: "",
followedUserId: "11",
followingUserId: "15",
};

describe("Registering API", () => {
  beforeAll(cleaningUpDatabase);
  it("should create a new userfollow", async done => {
    const res = await request(app)
      .post("/api/userfollow/v1/")
      .send(testUserFollow);
    testUserFollowID = res.header.location.split("=")[1];
    testJsonDataResponse.id = parseInt(testUserFollowID);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe("userfollow created");
    done();
  });
  it("should return all userfollows", async done => {
    const res = await request(app).get(`/api/userfollow/v1/`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toStrictEqual([testJsonDataResponse]);
    done();
  });
  it("should delete one userfollow", async done => {
    const res = await request(app)
      .delete(`/api/userfollow/v1`)
      .send({ id: [testUserFollowID] });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe("userfollow deleted");
    done();
  });
});
