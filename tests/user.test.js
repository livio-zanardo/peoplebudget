const request = require("supertest");
const mysql = require("mysql2/promise");
const app = require("../app");
const user = require("../models/user");
const role = require("../models/role");

const cleaningUpDatabase = async done => {
  console.log("Deleting all test data...");
  const connection = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBROOTUSER,
    password: process.env.DBROOTPW,
    database: `${process.env.DB}_test`
  });
  await connection.execute(`DELETE FROM users`);
  await connection.end();
  done();
};
const jsonData = {
	email: "jonDan26@gmail.com",
	fname: "Johnny",
	lname: "D'Antonino",
	pass : "pass",
	recover_pass: "fralalalala"
}

describe("User CRUD API", () => {
  beforeAll(cleaningUpDatabase);
  it("should create a user", async done => {
    const res = await request(app)
      .post("/api/user/v1/")
      .send(jsonData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("response");
    expect(res.body.response).toBe(
      "User Created!"
    );
    done();
  });
});
