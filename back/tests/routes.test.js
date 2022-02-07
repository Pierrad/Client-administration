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

describe("API Login route", () => {
  it("should login the user", async () => {
    let res = await agent.post("/users/login").send({
      email: "test@test.com",
      password: "Azerty@123456",
    });
    user = res.body.user;
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("user");
  });

  it("should not login a user with missing args", async () => {
    let res = await agent.post("/users/login").send({
      email: "test@test.com",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toEqual(false);
  });

  it("should not login a user that does not exist", async () => {
    let res = await agent.post("/users/login").send({
      email: "test2@tesst.com",
      password: "Azerty@123456",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toEqual(false);
  });

  it("should not login a user with a wrong password", async () => {
    let res = await agent.post("/users/login").send({
      email: "test@test.com",
      password: "Azerty123456",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toEqual(false);
  });
});

describe("API Retrieve user route", () => {
  it("should retrieve the user", async () => {
    let res = await agent.get(`/users/${user._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("user");
  });

  it("should not retrieve a user that does not exist", async () => {
    let res = await agent.get("/users/61f7943aa0d59ef067dd070d");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toEqual(false);
  });
});

describe("API Logout user route", () => {
  it("should logout the user", async () => {
    let res = await agent
      .get("/users/logout")
      .set("authorization", user.token.token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toEqual(true);
  });

  it("should not logout a user that is not authorized", async () => {
    let res = await agent
      .get("/users/logout")
      .set("authorization", "fnmklerfernfmerfmerfrenfre");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
    expect(res.body.success).toEqual(false);
  });
});

describe("API Delete route", () => {
  // We need to make sure that the authentification token exists so after the logout test we login the user for the delete test
  it("should login the user", async () => {
    let res = await agent.post("/users/login").send({
      email: "test@test.com",
      password: "Azerty@123456",
    });
    user = res.body.user;
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("user");
  });

  it("should delete a specific user", async () => {
    let res = await agent
      .delete(`/users/${user._id}`)
      .set("authorization", user.token.token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should not delete a specific user with an invalid id", async () => {
    let res = await agent
      .delete("/users/fnjefkjnerfer")
      .set("authorization", user.token.token);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
  });

  it("should not delete a specific user with an invalid token", async () => {
    let res = await agent
      .delete(`/users/${user._id}`)
      .set("authorization", "dnjkzedez");
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message");
  });
});
