import http from "http";
import { getUsersData, getUserById, getNewUser, getUpdatedUser, remove } from "../models/model.js";
import { getNewData, handleErrorResolve, handleSuccessResolve } from "../service/services.js";
import { newUserTypeGuard } from "../validators/new-user-type-guard.js";

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

    handleSuccessResolve(res, 200, users);
  } catch (error) {
    handleErrorResolve(res, 500, error);
  }
};

const getUser: GetUsers = async (req, res, id) => {
  try {
    const user: User = await getUserById(id);

    if (user) {
      handleSuccessResolve(res, 200, user);
    } else {
      handleErrorResolve(res, 404);
    }
  } catch (error) {
    handleErrorResolve(res, 500, error);
  }
};

const createNewUser: GetUsers = async (req, res) => {
  try {
    const body = await getNewData(req);
    const { name, age, hobbies } = JSON.parse(body);

    if (newUserTypeGuard(body)) {
      const user: User = {
        name,
        age,
        hobbies,
      };

      const newUser = await getNewUser(user);

      handleSuccessResolve(res, 201, newUser);
    } else {
      handleErrorResolve(res, 400);
    }
  } catch (error) {
    handleErrorResolve(res, 500, error);
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

      const updatedUser = await getUpdatedUser(id, userData);

      handleSuccessResolve(res, 200, updatedUser);
    } else {
      handleErrorResolve(res, 404);
    }
  } catch (error) {
    handleErrorResolve(res, 500, error);
  }
};

const removeUser: GetUsers = async (req, res, id) => {
  try {
    const user: User | unknown = await getUserById(id);

    if (user) {
      await remove(id);

      handleSuccessResolve(res, 204);
    } else {
      handleErrorResolve(res, 404);
    }
  } catch (error) {
    handleErrorResolve(res, 500, error);
  }
};

export const methodsMap: MethodsMap = {
  GET: getUsers,
  POST: createNewUser,
  GET_id: getUser,
  PUT_id: updateUser,
  DELETE_id: removeUser,
};
