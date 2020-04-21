// const request = require("supertest");
// const mysql = require("mysql2/promise");
// const app = require("../app");
// const user = require("../models/user");
// const testUser = {
//   fname: "fname",
//   lname: "lname",
//   email: "test@test.com",
//   pass: "password",
//   recover_pass: "password"
// };
// const testUserWithoutEmailField = {
//   fname: "fname",
//   lname: "lname",
//   pass: "password",
//   recover_pass: "password"
// };

// const cleaningUpDatabase = async done => {
//   console.log("Deleting all test data...");
//   const connection = await mysql.createConnection({
//     host: process.env.DBHOST,
//     user: process.env.DBROOTUSER,
//     password: process.env.DBROOTPW,
//     database: `${process.env.DB}_test`
//   });
//   await connection.execute(`DELETE FROM users`);
//   await connection.end();
//   done();
// };

// describe("Registering API", () => {
//   beforeAll(cleaningUpDatabase);
//   it("should receive error if a required field is missing", async done => {
//     const res = await request(app)
//       .post("/api/auth/v1/register")
//       .send(testUserWithoutEmailField);
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toHaveProperty("ClientError");
//     expect(res.body.ClientError).toBe("Missing paramater 'email' .");
//     done();
//   });
//   it("should register a new user", async done => {
//     const res = await request(app)
//       .post("/api/auth/v1/register")
//       .send(testUser);
//     expect(res.statusCode).toEqual(201);
//     expect(res.body).toHaveProperty("response");
//     expect(res.body.response).toBe("User registered!");
//     done();
//   });
//   it("Register user with same email", async done => {
//     const res = await request(app)
//       .post("/api/auth/v1/register")
//       .send(testUser);
//     expect(res.statusCode).toEqual(400);
//     expect(res.body).toHaveProperty("ClientError");
//     expect(res.body.ClientError).toBe(
//       "Type:'User', with query params:[email], already exists."
//     );
//     done();
//   });
// });
