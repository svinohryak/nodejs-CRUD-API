import request from "supertest";
import { server } from "../server/server";
import { mockUser, updatingUserDate } from "./consts";

describe("Geting, creating, updating and deleting user and checking consistency of its data", () => {
  it("should return empty array", async () => {
    await request(server).get("/api/users").expect([]);
  });

  it("should create new user and response containing newly created record SUPER", async () => {
    await request(server)
      .post("/api/users")
      .send(mockUser)
      .then((res) => {
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("age");
        expect(res.body).toHaveProperty("hobbies");
      });
  });

  it("should return created user by its id", async () => {
    const newUser = await request(server).post("/api/users").send(mockUser);

    await request(server)
      .get(`/api/users/${newUser.body.id}`)
      .then((res) => {
        expect(res.body.name).toBe(newUser.body.name);
        expect(res.body.age).toBe(newUser.body.age);
        expect(res.body.hobbies).toEqual<string[] | []>(newUser.body.hobbies);
      });
  });

  it("should update user and return updated data", async () => {
    const newUser = await request(server).post("/api/users").send(mockUser);

    await request(server)
      .put(`/api/users/${newUser.body.id}`)
      .send(updatingUserDate)
      .then((res) => {
        expect(res.body.name).toBe(updatingUserDate.name);
        expect(res.body.age).toBe(updatingUserDate.age);
        expect(res.body.hobbies).toEqual<string[] | []>(updatingUserDate.hobbies);
      });
  });

  it("should delete user and get 204 status code", async () => {
    const newUser = await request(server).post("/api/users").send(mockUser);
    await request(server).delete(`/api/users/${newUser.body.id}`).expect(204);
  });

  it("should get status code 404 and corresponding message that user doesn't exist", async () => {
    const newUser = await request(server).post("/api/users").send(mockUser);
    await request(server).delete(`/api/users/${newUser.body.id}`).expect(204);

    await request(server)
      .get(`/api/users/${newUser.body.id}`)
      .then((res) => {
        expect(404);
        expect(res.body.message).toBe("User doesn't exist");
      });
  });
});
