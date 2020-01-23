const supertest = require("supertest");
const server = require("./users_routes.js");
// const db = require("../../database/dbConfig.js");

describe("test test", () => {
  it("should be true", () => {
    expect(true).toBe(true);
  });
});

it("should send status code 200", () => {
  return supertest(server)
    .get("/api/users")
    .expect(200)
    .toBe(200);
});
