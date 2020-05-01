require('dotenv').config();
const request = require('supertest');
const app = require('../app/app');
const user = require('../app/models/user');

const prepareDatabase = (model) => async () => model.destroy({ where: {} });

const testJson = {
    fname: 'test',
    lname: 'test',
    email: 'test@test.com',
    pass: 'aPassword*!',
    recover: 'password',
    address1: 'a',
    address2: 'b',
    roleid: 1,
    securityQuestion: 'sec',
    linkedinurl: 'www.linkedn.com',
    image: 'test',
    zip: 33333
};

dbPostEntryId = null;

describe('Reply API', () => {
    beforeAll(prepareDatabase(user));
    it('Can create a new user', async (done) => {
        request(app)
            .post('/api/v1/user')
            .send(testJson)
            .then(({ body, header, statusCode }) => {
                dbPostEntryId = parseInt(header.location.split('=')[1]);
                expect(statusCode).toEqual(201);
                expect(body).toHaveProperty('response');
                expect(body.response).toBe('user created');
                done();
            });
    });
    // it("Can will fail to create new user without required field 'pass'", async (done) => {
    //     testJosnWithoutPass = delete testJson.pass;
    //     request(app)
    //         .post('/api/v1/user')
    //         .send(testJosnWithoutPass)
    //         .then(({ body, header, statusCode }) => {
    //             expect(statusCode).toEqual(400);
    //             expect(body).toHaveProperty('error');
    //             expect(body.type).toBe("Missing paramater 'pass' .");
    //             expect(body).toHaveProperty('type');
    //             expect(body.type).toBe('ClientError');
    //             done();
    //         });
    // });
});
