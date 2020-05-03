const request = require('supertest');
const app = require('../app/app');
const Reply = require('../app/models/reply');

const prepareDatabase = (model) => async () => model.destroy({ where: {} });

const testJson = {
    commentId: 1,
    replyBody: 'Test'
};

describe('Reply API', () => {
    beforeAll(prepareDatabase(Reply));
    afterEach(prepareDatabase(Reply));

    it('Can Post New Reply', async (done) => {
        const { body, statusCode } = await request(app).post('/api/v1/reply').send(testJson);
        expect(statusCode).toEqual(201);
        expect(body).toHaveProperty('response');
        expect(body.response).toBe('reply posted');
        done();
    });
    it(`Returns Error Specifying Missing Parameter(replyBody)`, async (done) => {
        const testJsonBadData = { commentId: testJson.commentId };
        const { body, statusCode } = await request(app).post('/api/v1/reply').send(testJsonBadData);
        expect(statusCode).toEqual(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe("Missing paramater 'replyBody' .");
        expect(body).toHaveProperty('type');
        expect(body.type).toBe('ClientError');
        done();
    });
    it(`Returns Error Specifying Missing Parameter(commentId)`, async (done) => {
        const testJsonBadData = { replyBody: testJson.replyBody };
        const { body, statusCode } = await request(app).post('/api/v1/reply').send(testJsonBadData);
        expect(statusCode).toEqual(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe("Missing paramater 'commentId' .");
        expect(body).toHaveProperty('type');
        expect(body.type).toBe('ClientError');
        done();
    });
    it('Can GET A Reply', async (done) => {
        const reply = await Reply.create({
            ...testJson
        });

        delete reply.dataValues.updatedAt;
        delete reply.dataValues.createdAt;

        const { body, statusCode } = await request(app).get(`/api/v1/reply?id=${reply.id}`);
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty('response');
        expect(body.response).toStrictEqual({ ...reply.dataValues });
        done();
    });
    it('Can GET Replies Paginated', async (done) => {
        const replya = await Reply.create({
            ...testJson
        });
        delete replya.dataValues.updatedAt;
        delete replya.dataValues.createdAt;

        const replyb = await Reply.create({
            ...testJson
        });
        delete replyb.dataValues.updatedAt;
        delete replyb.dataValues.createdAt;

        const testJsonResponsePagination = {
            count: 2,
            rows: [replya.dataValues, replyb.dataValues],
            maxPages: 1
        };
        const { body, statusCode } = await request(app).get(`/api/v1/reply`);
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty('response');
        expect(body.response).toStrictEqual(testJsonResponsePagination);
        done();
    });
    it('Returns Error Specifying Missing Id', async (done) => {
        const { body, statusCode } = await request(app).get(`/api/v1/reply?id=${0}`);
        expect(statusCode).toEqual(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toStrictEqual(`reply with id[${0}] does not exist`);
        expect(body).toHaveProperty('type');
        expect(body.type).toStrictEqual(`ClientError`);
        done();
    });
    it('Can Update A Reply', async (done) => {
        const reply = await Reply.create({
            ...testJson
        });
        const { body, statusCode } = await request(app).put(`/api/v1/reply?id=${reply.id}`).send({
            replyBody: 'Test reply message'
        });
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty('response');
        expect(body.response).toBe(`reply with id[${reply.id}] updated`);
        done();
    });
    it('Returns Error Specifying Missing Id', async (done) => {
        const { body, statusCode } = await request(app)
            .put(`/api/v1/reply?id=${0}`)
            .send({ replyBody: 'Test reply message' });
        expect(statusCode).toEqual(400);
        expect(body).toHaveProperty('error');
        expect(body.error).toBe(`reply with id[${0}] does not exist`);
        expect(body).toHaveProperty('type');
        expect(body.type).toBe(`ClientError`);
        done();
    });
    it('Can Delete A Reply', async (done) => {
        const reply = await Reply.create({
            ...testJson
        });
        const { body, statusCode } = await request(app)
            .delete('/api/v1/reply')
            .send({ id: reply.id });
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty('response');
        expect(body.response).toBe(`reply with id[${reply.id}] deleted`);
        done();
    });
    it('Can Delete Replies', async (done) => {
        const replya = await Reply.create({
            ...testJson
        });
        const replyb = await Reply.create({
            ...testJson
        });
        const { body, statusCode } = await request(app)
            .delete('/api/v1/reply')
            .send({ id: [replya.id, replyb.id] });
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty('response');
        expect(body.response).toBe(
            `replies with ids[${[replya.id, replyb.id].join(' , ')}] deleted`
        );
        done();
    });
    it('Can Post New Reply', async (done) => {
        const { body, statusCode } = await request(app).post('/api/v1/reply/reply').send(testJson);
        expect(statusCode).toEqual(201);
        expect(body).toHaveProperty('response');
        expect(body.response).toBe('reply posted');
        done();
    });
});
