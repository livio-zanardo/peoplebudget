require('dotenv').config();
const request = require("supertest");
const mysql = require("mysql2/promise");
const app = require("../app/app");
const userfollow = require("../app/models/userFollow");

const prepareDatabase = (model) => async () => model.destroy({ where: {} });

let testUserFollowID = null;

const testUserFollow = {
    followedUserId: "11",
    followingUserId: "15"
};

const testJsonDataResponse = {
    id: "",
    followedUserId: "11",
    followingUserId: "15"
};

describe("userfollow API", () => {
    beforeAll(prepareDatabase(userfollow));
    
        it('should create a new userfollow', async (done) => {
            request(app)
                .post('/api/v1/userfollow/')
                .send(testUserFollow)
                .then(({ body, header, statusCode }) => {
            testUserFollowID = header.location.split("=")[1];
            testJsonDataResponse.id = parseInt(testUserFollowID);
            expect(statusCode).toEqual(201);
            expect(body).toHaveProperty('response');
            expect(body.response).toBe('userfollow created');
            done();
            });
        });

        it("should give error missing param 'followedUserId'", async (done) => {
            const testUserFollowBad = { followingUserId: testUserFollow.followingUserId };
            request(app)
                .post("/api/v1/userfollow/")
                .send(testUserFollowBad)
                .then(({ body, statusCode }) => {
            expect(statusCode).toEqual(400);
            expect(body).toHaveProperty('error');
            expect(body.error).toBe(
                "Missing paramater 'followedUserId' .");
            expect(body).toHaveProperty('type');
            expect(body.type).toBe(
            'ClientError');
            done();
        });
    });
    

    
        it("should return all userfollows", async (done) => {
            request(app)
            .get(`/api/v1/userfollow/`)
            .then(({ body, statusCode }) => {
            expect(statusCode).toEqual(200);
            expect(body).toHaveProperty("response");
            expect(body.response).toStrictEqual({
                count: 1,
                maxPages: 1,
                rows: [
                {
                    followedUserId: 11,
                    followingUserId: 15,
                    id: testJsonDataResponse.id
                }
                ]
            });
            done();
        });
    });

        it("should give error id doesn't exist", async (done) => {
            request(app)
            .get(`/api/v1/userfollow/?id=9999999`)
            .then(({ body, statusCode }) => {
            expect(statusCode).toEqual(400);
            expect(body).toHaveProperty('error');
            expect(body.error).toBe("id 9999999 doesn't exist");
            expect(body).toHaveProperty('type');
            expect(body.type).toBe('ClientError');
            done();
        });
    });

    
        it("should update userfollow info", async (done) => {
            request(app)
            .put(`/api/v1/userfollow/`)
            .send({
                id: testUserFollowID,
                followedUserId: "55"
            })
            .then(({ body, statusCode }) => {
            expect(statusCode).toEqual(200);
            expect(body).toHaveProperty("response");
            expect(body.response).toBe("userfollow updated");
            done();
        });
    });

        it("should give error missing param id", async (done) => {
            request(app)
                .put(`/api/v1/userfollow/`)
                .send(testUserFollow)
                .then(({ body, statusCode }) => {
            expect(statusCode).toEqual(400);
            expect(body).toHaveProperty('error');
            expect(body.error).toBe("Missing paramater 'id' .");
            expect(body).toHaveProperty('type');
            expect(body.type).toBe('ClientError');
            done();
        });
    });
    

    
        it("should delete one userfollow", async (done) => {
            request(app)
                .delete(`/api/v1/userfollow/`)
                .send({ id: testUserFollowID })
                .then(({ body, statusCode }) => {
            expect(statusCode).toEqual(200);
            expect(body).toHaveProperty("response");
            expect(body.response).toBe(
                `userfollow ${testUserFollowID} deleted`
            );
            done();
        });
    });

        it("should give error missing param id", async (done) => {
            request(app)
                .delete(`/api/v1/userfollow/`)
                .send(testJsonDataResponse)
                .then (({ body, statusCode }) => {
            expect(statusCode).toEqual(400);
            expect(body).toHaveProperty('error');
            expect(body.error).toBe(
                `id ${testJsonDataResponse.id} doesn't exist`
            );
            expect(body).toHaveProperty('type');
            expect(body.type).toBe('ClientError');
            done();
        });
    });
});

