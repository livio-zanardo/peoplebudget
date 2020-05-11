const app = require('../app/app');
const request = require('supertest');
const { hash } = require('../app/helpers/hash');
const Role = require('../app/models/Role');
const Post = require('../app/models/post');
const User = require('../app/models/user');
const PostFollow = require('../app/models/postfollow');

// npx cross-env NODE_ENV=test jest tests/postFollow.test.js --testTimeout=10000 --runInBand --detectOpenHandles
// const prepareDatabase = (model) => async () => await model.destroy({ where: {} });
const prepareDatabasePromise = (model) => async () => model.destroy({ where: {} });

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

const addRoleUserPost = async () => {
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
    return [role, user, post, data];
};

const compose = (...fns) => {
    return async () => await Promise.all(...fns);
};

describe('PostFollow API', () => {
    beforeAll(
        compose([
            prepareDatabasePromise(User),
            prepareDatabasePromise(Role),
            prepareDatabasePromise(Post),
            prepareDatabasePromise(PostFollow)
        ])
    );

    it('Should create a record to follow a post', async (done) => {
        const [role, user, post, data] = await addRoleUserPost();
        const res = await request(app).post('/api/v1/postfollow').send(data);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('response');
        expect(res.body.response).toBe('postfollow created');
        done();
    });

    it('should return an error with missing followedPostId', async (done) => {
        const [role, user, post, data] = await addRoleUserPost();
        delete data.followedPostId;
        const res = await request(app).post('/api/v1/postfollow').send(data);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe("Missing paramater 'followedPostId' .");
        expect(res.body).toHaveProperty('type');
        expect(res.body.type).toBe('ClientError');
        done();
    });

    it('should return all the followed posts by a user', async (done) => {
        const [role, user, post, data] = await addRoleUserPost();
        const postFollow = await PostFollow.create(data);
        delete postFollow.dataValues.updatedAt;
        delete postFollow.dataValues.createdAt;
        delete postFollow.dataValues.followingUserId;
        const res = await request(app).get(`/api/v1/postfollow?user=${user.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('response');
        // expect(res.body.response).toStrictEqual({
        //     count: 1,
        //     maxPages: 1,
        //     rows: [postFollow.dataValues]
        // });
        expect(res.body.response).toStrictEqual([postFollow.dataValues]);
        done();
    });

    it('should return all the users following a post', async (done) => {
        const [role, user, post, data] = await addRoleUserPost();
        const postFollow = await PostFollow.create(data);
        delete postFollow.dataValues.updatedAt;
        delete postFollow.dataValues.createdAt;
        delete postFollow.dataValues.followedPostId;
        const res = await request(app).get(`/api/v1/postfollow?post=${post.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('response');
        expect(res.body.response).toStrictEqual([postFollow.dataValues]);
        done();
    });

    it('should return all post following', async (done) => {
        await PostFollow.destroy({ where: {} });
        const [role, user, post, data] = await addRoleUserPost();
        const postFollow = await PostFollow.create(data);
        delete postFollow.dataValues.updatedAt;
        delete postFollow.dataValues.createdAt;
        const res = await request(app).get(`/api/v1/postfollow`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('response');
        expect(res.body.response).toStrictEqual({
            count: 1,
            maxPages: 1,
            rows: [postFollow.dataValues]
        });
        done();
    });

    it('should give an error for id not in database', async (done) => {
        const [role, user, post, data] = await addRoleUserPost();
        const res = await request(app).get(`/api/v1/postfollow?id=${999}`);
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('type');
        expect(res.body.type).toBe(`ClientError`);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(`id '999' doesn't exist`);
        done();
    });

    it('should update followedPostId', async (done) => {
        const [role, user, post, data] = await addRoleUserPost();
        const postFollow = await PostFollow.create(data);
        const res = await request(app).put(`/api/v1/postfollow`).send({
            id: postFollow.id,
            followedPostId: '5'
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('response');
        expect(res.body.response).toBe('follow info updated');
        done();
    });

    it('should give an error missing id parameter', async (done) => {
        const res = await request(app).put('/api/v1/postfollow').send({
            followedPostId: '5'
        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('type');
        expect(res.body.type).toBe('ClientError');
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe("Missing paramater 'id' .");
        done();
    });

    it('should delete one userfollow', async (done) => {
        const [role, user, post, data] = await addRoleUserPost();
        const postFollow = await PostFollow.create(data);
        const res = await request(app).delete(`/api/v1/postfollow`).send({ id: postFollow.id });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('response');
        expect(res.body.response).toBe(`Id '${postFollow.id}' was deleted`);
        done();
    });

    it('should give an error missing id parameter', async (done) => {
        const [role, user, post, data] = await addRoleUserPost();
        const res = await request(app).delete('/api/v1/postfollow').send({ id: 999 });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('type');
        expect(res.body.type).toBe(`ClientError`);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe(`id '${999}' doesn't exist`);
        done();
    });
});
