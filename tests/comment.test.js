const request = require('supertest');
const app = require('../app/app');
const Comment = require('../app/models/comment');

// npx cross-env NODE_ENV=test jest tests/comment.test.js --testTimeout=10000 --runInBand --detectOpenHandles

const prepareDatabase = (model) => async () => await model.destroy({ where: {} });

const testJson = {
    userId: 1,
    postId: 1,
    commentBody: 'Hello'
};
describe('Comment API', () => {
    beforeAll(prepareDatabase(Comment));
    afterEach(prepareDatabase(Comment));
    it('should create a comment', async (done) => {
        const { body, statusCode } = await request(app).post('/api/v1/comment').send(testJson);
        expect(statusCode).toEqual(201);
        expect(body).toHaveProperty('response');
        expect(body.response).toBe('comment created');
        done();
    });
    it('should return a specific comment via ID', async (done) => {
        const comment = await Comment.create({
            ...testJson
        });
        delete comment.dataValues.createdAt;
        delete comment.dataValues.updatedAt;
        const { body, statusCode } = await request(app).get(`/api/v1/comment?id=${comment.id}`);
        expect(statusCode).toEqual(200);
        expect(body).toHaveProperty('response');
        expect(body.response).toStrictEqual(comment.dataValues);
        done();
    });
    it('should return all comments from a specified user', async (done) => {
        const comment = await Comment.create({
            ...testJson
        });
        delete comment.dataValues.createdAt;
        delete comment.dataValues.updatedAt;
        const response = {
            count: 1,
            rows: [comment.dataValues],
            maxPages: 1
        };
        const res = await request(app).get(`/api/v1/comment?userId=${comment.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('response');
        expect(res.body.response).toStrictEqual(response);
        done();
    });
    it('Should update commendBody', async (done) => {
        const comment = await Comment.create({
            ...testJson
        });
        const res = await request(app).put(`/api/v1/comment?id=${comment.id}`).send({
            commentBody: 'updated'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('response');
        expect(res.body.response).toBe('The comment has been updated');
        done();
    });
    it('should delete one user', async (done) => {
        const comment = await Comment.create({
            ...testJson
        });
        const res = await request(app).delete(`/api/v1/comment`).send({ id: comment.id });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('response');
        expect(res.body.response).toBe('The comment has been deleted');
        done();
    });
});
