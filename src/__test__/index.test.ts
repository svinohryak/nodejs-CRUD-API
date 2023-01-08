import request from "supertest";
import { server } from "../server/server";
import { User } from "../models/model";

const mockUser: User = {
  name: "user-1",
  age: 35,
  hobbies: ["coding"],
};

const updatingUserDate: User = {
  name: "user-1",
  age: 36,
  hobbies: ["sleeping"],
};

const invalidId = "309ee828-8420-4321-9d81-cda";
const validId = "309ee828-8420-4321-9d81-cdadd435a387";

describe("Geting, creating, updating and deleting user and consistency of its data", () => {
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
        // expect(res.body.name).toBe(updatedName);
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
