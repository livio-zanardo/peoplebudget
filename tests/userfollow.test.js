const request = require("supertest");
const mysql = require("mysql2/promise");
const app = require("../app");
const user = require("../models/userfollow");


const cleaningUpDatabase = async done => {
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

describe("userfollow API", () => {
  beforeAll(cleaningUpDatabase);

  describe("post", () => {
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

    it("should give error missing param 'followedUserId'", async done => {
      const testUserFollowBad = { ...testUserFollow};
      delete testUserFollowBad.followedUserId;
      const res = await request(app)
        .post("/api/userfollow/v1/")
        .send(testUserFollowBad);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("ClientError");
      expect(res.body.ClientError).toBe("Missing paramater 'followedUserId' .");
      done();
    });
  });

  describe("read", () => {
    it("should return all userfollows", async done => {
      const res = await request(app).get(`/api/userfollow/v1/`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("response");
      expect(res.body.response).toStrictEqual(
        {
          "count": 1, 
          "maxPages": 1, 
          "rows": [
            {"followedUserId": 11, 
            "followingUserId": 15, 
            "id": testJsonDataResponse.id
          }
        ]}
      );
      done();
    });

    it("should give error id doesn't exist", async done => {
      const res = await request(app).get(`/api/userfollow/v1/?id=9999999`);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("ClientError");
      expect(res.body.ClientError).toBe(
      `id 9999999 doesn't exist`
      );
      done();
    });
  });

  describe("update", () => {
    it("should update userfollow info", async done => {
      const res = await request(app)
        .put(`/api/userfollow/v1/`)
        .send({
          id: testUserFollowID,
          followedUserId: "55"
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("response");
      expect(res.body.response).toBe("userfollow updated");
      done();
    });

    it("should give error missing param id", async done => {
      const res = await request(app)
        .put(`/api/userfollow/v1/`)
        .send(testUserFollow);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("ClientError");
      expect(res.body.ClientError).toBe("Missing paramater 'id' .");
      done();
    });
  });

  describe("delete", () => {
    it("should delete one userfollow", async done => {
      const res = await request(app)
        .delete(`/api/userfollow/v1`)
        .send({ id: testUserFollowID });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("response");
      expect(res.body.response).toBe(`userfollow ${testUserFollowID} deleted`);
      done();
    });

    it("should give error missing param id", async done => {
      const res = await request(app)
        .delete(`/api/userfollow/v1`)
        .send(testJsonDataResponse);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("ClientError");
      expect(res.body.ClientError).toBe(`id ${testJsonDataResponse.id} doesn't exist`);
      done();
    });
  });
});
