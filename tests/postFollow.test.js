const request = require("supertest");
const mysql = require("mysql2/promise");
const app = require("../app");
const postfollow = require("../models/postfollow");

const cleaningUpDatabase = async (done) => {
  console.log("Deleting all test data...");
  const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBROOTUSER,
    password: process.env.DBROOTPW,
    database: `${process.env.DB}_test`,
  });
  await connection.execute(`DELETE FROM postfollows`);
  await connection.end();
  done();
};

let testFollowedPostId = 1;
const testJsonData = {
  followedPostId: 1,
  followingUserId: 2,
};
const testJsonDataResponse = {
  id: "",
  followedPostId: 1,
  followingUserId: 2,
};
const testJsonDataResponsePostError = {
  
  followingUserId: 2
};




describe("postFollow CRUD API", () => {
  beforeAll(cleaningUpDatabase);
  it("should create a postFollowed", async (done) => {
    const res = await request(app)
      .post("/api/postfollow/v1/")
      .send(testJsonData);
      testfollowingUserID = res.header.location.split("=")[1];
      testJsonDataResponse.id = parseInt(testfollowingUserID);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe("postfollow created");
    done();
  });
  it("should return an error with missing followedPostId", async (done) => {
    const res = await request(app)
      .post("/api/postfollow/v1/")
      .send(testJsonDataResponsePostError);
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("ClientError");
    expect(res.body.ClientError).toBe("Missing paramater 'followedPostId' .");
    done();
  });
  it("should return all the followed posts", async done => {
    const res = await request(app).get(`/api/postfollow/v1/`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toStrictEqual({
      "count": 1, 
      "maxPages": 1, 
    "rows": [
      {"id":testJsonDataResponse.id,
        "followedPostId": 1,
        "followingUserId": 2
    }]});
    done();
  });
  it("should give an error for id not in database", async done => {
    const res = await request(app).get(`/api/postfollow/v1/?id=${testFollowedPostId}`)
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("ClientError");
    expect(res.body.ClientError).toBe(`id '${testFollowedPostId}' doesn't exist`);
    done();
  });
  it("should update followedPostId", async done => {
    const res = await request(app)
      .put(`/api/postfollow/v1/`)
      .send({
        id: testfollowingUserID,
        followedPostId: "5"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe("follow info updated");
    done();
  });
  it("should give an error missing id parameter", async (done) => {
    const res = await request(app)
      .put("/api/postfollow/v1/")
      .send(testJsonData);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("ClientError");
    expect(res.body.ClientError).toBe("Missing paramater 'id' .");
    done();
  });
  it("should delete one userfollow", async done => {
    const res = await request(app)
      .delete(`/api/postfollow/v1`)
      .send({ id: testfollowingUserID  });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe(`Id '${testfollowingUserID}' was deleted`);
    done();
  });
  it("should give an error missing id parameter", async (done) => {
    const res = await request(app)
      .delete("/api/postfollow/v1/")
      .send(testJsonDataResponse);
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("ClientError");
    expect(res.body.ClientError).toBe(`id '${testJsonDataResponse.id}' doesn't exist`);
    done();
    });

});
