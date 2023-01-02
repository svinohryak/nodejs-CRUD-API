import http from "http";
import { getUsersData, getUserById, getNewUser, getUpdatedUser, remove } from "../models/model.js";
import { getNewData } from "../service/services.js";

type GetUsers = (req: http.IncomingMessage, res: http.ServerResponse, id?: string) => void;
interface User {
  id?: string;
  name: string;
  age: number;
  hobbies: string[] | [];
}

export const getUsers: GetUsers = async (req, res) => {
  try {
    const users: User[] = await getUsersData();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } catch (error) {
    // res.writeHead(404, { "Content-Type": "application/json" });
    // res.end(JSON.stringify(error));
    console.log(error);
  }
};

export const getUser: GetUsers = async (req, res, id) => {
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
  }
};

export const createNewUser: GetUsers = async (req, res) => {
  try {
    const body = await getNewData(req);
    const { name, age, hobbies } = JSON.parse(body);

    const user: User = {
      name,
      age,
      hobbies,
    };

    const newUser = await getNewUser(user);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
};

export const updateUser: GetUsers = async (req, res, id) => {
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
  }
};

export const removeUser: GetUsers = async (req, res, id) => {
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
  }
};
