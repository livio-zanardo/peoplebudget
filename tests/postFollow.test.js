const app = require('../app/app');
const request = require('supertest');
const PostFollow = require('../app/models/postfollow');
const { hash } = require('../app/helpers/hash');
const Role = require('../app/models/Role');
const Post = require('../app/models/post');
const User = require('../app/models/user');

// npx cross-env NODE_ENV=test jest tests/postFollow.test.js --testTimeout=10000 --runInBand --detectOpenHandles
const prepareDatabase = (model) => async () => await model.destroy({ where: {} });

const userData = {
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

describe('PostFollow API', () => {
    beforeAll(prepareDatabase(PostFollow));
    afterEach(prepareDatabase(PostFollow));

    it('Should create a record to follow a post', async (done) => {
        const role = await Role.create({
            role: 'admin'
        });
        const user = await User.create({
            email: userData.email,
            lastName: userData.lname,
            firstName: userData.fname,
            hash: await hash(userData.pass),
            recoveryHash: await hash(userData.recover),
            securityQuestion: userData.securityQuestion,
            image: userData.image,
            RoleId: role.id,
            address1: userData.address1,
            address2: userData.address2,
            zip: userData.zip,
            linkedinurl: userData.linkedinurl
        });
        const post = await Post.create({
            body: 'test body',
            userId: user.id,
            title: 'test title',
            tags: 'test tags',
            votes: 4
        });
        const data = {
            followedPostId: user.id,
            followingUserId: post.id
        };
        const res = await request(app).post('/api/v1/postfollow').send(data);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('response');
        expect(res.body.response).toBe('postfollow created');
        done();
    });

    // it('should return an error with missing followedPostId', async (done) => {
    //     const res = await request(app)
    //         .post('/api/postfollow/v1/')
    //         .send(testJsonDataResponsePostError);

    //     expect(res.statusCode).toEqual(400);
    //     expect(res.body).toHaveProperty('ClientError');
    //     expect(res.body.ClientError).toBe("Missing paramater 'followedPostId' .");
    //     done();
    // });
    // it('should return all the followed posts', async (done) => {
    //     const res = await request(app).get(`/api/postfollow/v1/`);
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toHaveProperty('response');
    //     expect(res.body.response).toStrictEqual({
    //         count: 1,
    //         maxPages: 1,
    //         rows: [
    //             {
    //                 id: testJsonDataResponse.id,
    //                 followedPostId: 1,
    //                 followingUserId: 2
    //             }
    //         ]
    //     });
    //     done();
    // });
    // it('should give an error for id not in database', async (done) => {
    //     const res = await request(app).get(`/api/postfollow/v1/?id=${testFollowedPostId}`);
    //     expect(res.statusCode).toEqual(400);
    //     expect(res.body).toHaveProperty('ClientError');
    //     expect(res.body.ClientError).toBe(`id '${testFollowedPostId}' doesn't exist`);
    //     done();
    // });
    // it('should update followedPostId', async (done) => {
    //     const res = await request(app).put(`/api/postfollow/v1/`).send({
    //         id: testfollowingUserID,
    //         followedPostId: '5'
    //     });
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toHaveProperty('response');
    //     expect(res.body.response).toBe('follow info updated');
    //     done();
    // });
    // it('should give an error missing id parameter', async (done) => {
    //     const res = await request(app).put('/api/postfollow/v1/').send(testJsonData);
    //     expect(res.statusCode).toEqual(400);
    //     expect(res.body).toHaveProperty('ClientError');
    //     expect(res.body.ClientError).toBe("Missing paramater 'id' .");
    //     done();
    // });
    // it('should delete one userfollow', async (done) => {
    //     const res = await request(app)
    //         .delete(`/api/postfollow/v1`)
    //         .send({ id: testfollowingUserID });
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toHaveProperty('response');
    //     expect(res.body.response).toBe(`Id '${testfollowingUserID}' was deleted`);
    //     done();
    // });
    // it('should give an error missing id parameter', async (done) => {
    //     const res = await request(app).delete('/api/postfollow/v1/').send(testJsonDataResponse);

    //     expect(res.statusCode).toEqual(400);
    //     expect(res.body).toHaveProperty('ClientError');
    //     expect(res.body.ClientError).toBe(`id '${testJsonDataResponse.id}' doesn't exist`);
    //     done();
    // });
});
