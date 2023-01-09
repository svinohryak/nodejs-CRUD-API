import request from "supertest";
import { server } from "../server/server";
import { invalidId, mockUser, updatingUserDate, validId } from "./consts";

describe("Check status codes", () => {
  beforeEach(async () => {
    await request(server).post("/api/users").send(mockUser);
  });

  afterEach(async () => {
    const allUsers = await request(server).get("/api/users");
    await request(server).delete(`/api/users/${allUsers.body[0].id}`);
  });

  describe("GET methods", () => {
    it("should get 200 for GET all", async () => {
      await request(server).get("/api/users").expect(200);
    });

    it("should get 200 for GET one user", async () => {
      const allUsers = await request(server).get("/api/users");
      await request(server).get(`/api/users/${allUsers.body[0].id}`).expect(200);
    });

    it("should get 400 for GET with invalid uuid", async () => {
      await request(server).get(`/api/users/${invalidId}`).expect(400);
    });

    it("should get 404 for GET if user doesn't", async () => {
      await request(server).get(`/api/users/${validId}`).expect(404);
    });
  });

  describe("POST methods", () => {
    it("should get 201 for create new user", async () => {
      await request(server).post("/api/users").send(mockUser).expect(201);
    });

    it("should get 400 if there is no required fields", async () => {
      await request(server).post("/api/users").send({ name: "user-2", age: 21 }).expect(400);
    });
  });

  describe("PUT methods", () => {
    it("should get 200 for udating user", async () => {
      const allUsers = await request(server).get("/api/users");
      await request(server).put(`/api/users/${allUsers.body[0].id}`).send(updatingUserDate).expect(200);
    });

    it("should get 400 id is invalid", async () => {
      await request(server).put(`/api/users/${invalidId}`).send(updatingUserDate).expect(400);
    });

    it("should get 400 if required field is missed", async () => {
      await request(server).put(`/api/users/${validId}`).send({ age: 34 }).expect(400);
    });

    it("should get 404 if user doesn't exist", async () => {
      await request(server).put(`/api/users/${validId}`).send(updatingUserDate).expect(404);
    });
  });

  describe("DELETE methods", () => {
    it("should get 204 after deleting user", async () => {
      const allUsers = await request(server).get("/api/users");
      await request(server).delete(`/api/users/${allUsers.body[0].id}`).expect(204);
    });

    it("should get 400 id is invalid", async () => {
      await request(server).delete(`/api/users/${invalidId}`).expect(400);
    });

    it("should get 404 if user doesn't exist", async () => {
      await request(server).delete(`/api/users/${validId}`).expect(404);
    });
  });
});
