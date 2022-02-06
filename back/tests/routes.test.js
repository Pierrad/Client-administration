require("dotenv").config();
const createServer = require("../index");
const mongoose = require("mongoose");
const request = require("supertest");

beforeAll((done) => {
  mongoose.connect(
    process.env.MONGO_DB_URL_TESTING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterAll((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

const app = createServer();
const agent = request.agent(app);

let user;

describe("API home", () => {
  it("should return a welcome message", async () => {
    let res = await agent.get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});

describe("API Register route", () => {
  it("should register a new user", async () => {
    let res = await agent.post("/users").send({
      email: "test@test.com",
      password: "Azerty@123456",
      username: "Test",
      firstName: "Test",
      lastName: "Test",
      address: "rue du test, Biot",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("user");
  });

  it("should not register a new user with an existing email", async () => {
    let res = await agent.post("/users").send({
      email: "test@test.com",
      password: "Azerty@123456",
      username: "Test",
      firstName: "Test",
      lastName: "Test",
      address: "rue du test, Biot",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toEqual(false);
  });

  it("should not register a new user with missing args", async () => {
    let res = await agent.post("/users").send({
      email: "test@test.com",
      password: "Azerty@123456",
      username: "Test",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toEqual(false);
  });

  it("should not register a new user with a falsy email", async () => {
    let res = await agent.post("/users").send({
      email: "testtest.com",
      password: "Azerty@123456",
      username: "Test",
      firstName: "Test",
      lastName: "Test",
      address: "rue du test, Biot",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toEqual(false);
  });

  it("should not register a new user with a weak password", async () => {
    let res = await agent.post("/users").send({
      email: "testtest.com",
      password: "Azerty12",
      username: "Test",
      firstName: "Test",
      lastName: "Test",
      address: "rue du test, Biot",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toEqual(false);
  });
});
