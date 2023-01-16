import request from "supertest";
import { server } from "../server/server";
import { ErrorMessages, invalidId, mockUser, validId } from "./consts";

describe("Checking response message", () => {
  describe("GET", () => {
    it("Should return 'User Id is invalid' message when id is not uuid format", async () => {
      await request(server)
        .get(`/api/users/${invalidId}`)
        .then((res) => {
          expect(400);
          expect(res.body.message).toBe(ErrorMessages.ID);
        });
    });

    it("Should return 'User doesn't exist' message if there is no user with this id", async () => {
      await request(server)
        .get(`/api/users/${validId}`)
        .then((res) => {
          expect(404);
          expect(res.body.message).toBe(ErrorMessages.USER);
        });
    });
  });

  describe("POST", () => {
    it("Should return 'Body does not contain required fields or data type is wrong' message if there is no required field", async () => {
      await request(server)
        .post("/api/users")
        .send({ name: "name", age: 39 })
        .then((res) => {
          expect(400);
          expect(res.body.message).toBe(ErrorMessages.FIELD);
        });
    });
  });

  describe("PUT", () => {
    it("Should return 'User Id is invalid' message when id is not uuid format", async () => {
      await request(server)
        .put(`/api/users/${invalidId}`)
        .then((res) => {
          expect(400);
          expect(res.body.message).toBe(ErrorMessages.ID);
        });
    });

    it("Should return 'Body does not contain required fields or data type is wrong' message if there is no required field", async () => {
      await request(server)
        .put(`/api/users/${validId}`)
        .send({ name: "name", age: 39 })
        .then((res) => {
          expect(400);
          expect(res.body.message).toBe(ErrorMessages.FIELD);
        });
    });

    it("Should return 'User doesn't exist' message if there is no user with this id", async () => {
      await request(server)
        .put(`/api/users/${validId}`)
        .send(mockUser)
        .then((res) => {
          expect(404);
          expect(res.body.message).toBe(ErrorMessages.USER);
        });
    });
  });

  describe("DELETE", () => {
    it("Should return 'User Id is invalid' message when id is not uuid format", async () => {
      await request(server)
        .delete(`/api/users/${invalidId}`)
        .then((res) => {
          expect(400);
          expect(res.body.message).toBe(ErrorMessages.ID);
        });
    });

    it("Should return 'User doesn't exist' message if there is no user with this id", async () => {
      await request(server)
        .delete(`/api/users/${validId}`)
        .then((res) => {
          expect(404);
          expect(res.body.message).toBe(ErrorMessages.USER);
        });
    });
  });

  describe("COMMON", () => {
    it("Should return 'Route not found' message when requests to non-existing endpoints", async () => {
      await request(server)
        .get("/some-non/existing/resource")
        .then((res) => {
          expect(404);
          expect(res.body.message).toBe(ErrorMessages.ROUTE);
        });
    });
  });
});
