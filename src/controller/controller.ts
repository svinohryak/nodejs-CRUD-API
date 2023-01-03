import http from "http";
import { getUsersData, getUserById, getNewUser, getUpdatedUser, remove } from "../models/model.js";
import { getNewData } from "../service/services.js";

export type GetUsers = (req: http.IncomingMessage, res: http.ServerResponse, id?: string) => void;
interface User {
  id?: string;
  name: string;
  age: number;
  hobbies: string[] | [];
}

interface MethodsMap {
  [key: string]: GetUsers;
}

const getUsers: GetUsers = async (req, res) => {
  try {
    const users: User[] = await getUsersData();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    // res.writeHead(404, { "Content-Type": "application/json" });
    // res.end(JSON.stringify(error));
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};

const getUser: GetUsers = async (req, res, id) => {
  try {
    const user: User = await getUserById(id);

    if (user) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User doesn't exist" }));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};

const createNewUser: GetUsers = async (req, res) => {
  try {
    const body = await getNewData(req);
    const { name, age, hobbies } = JSON.parse(body);

    if (
      name &&
      age &&
      hobbies &&
      typeof age === "number" &&
      typeof name === "string" &&
      typeof hobbies === "object"
    ) {
      const user: User = {
        name,
        age,
        hobbies,
      };

      console.log(typeof hobbies);

      const newUser = await getNewUser(user);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Body does not contain required fields" }));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};

const updateUser: GetUsers = async (req, res, id) => {
  try {
    const user: User = await getUserById(id);

    if (user) {
      const body = await getNewData(req);
      const { name, age, hobbies } = JSON.parse(body);

      const userData: User = {
        name: name || user.name,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const newUser = await getUpdatedUser(id, userData);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User doesn't exist" }));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};

const removeUser: GetUsers = async (req, res, id) => {
  try {
    const user: User | unknown = await getUserById(id);

    if (user) {
      await remove(id);

      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify("User was deleted"));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User doesn't exist" }));
    }
  } catch (error) {
    console.log(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Internal Server Error" }));
  }
};

export const methodsMap: MethodsMap = {
  GET: getUsers,
  POST: createNewUser,
  GET_id: getUser,
  PUT_id: updateUser,
  DELETE_id: removeUser,
};
