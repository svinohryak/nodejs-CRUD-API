import { v4 as uuid } from "uuid";

export interface User {
  id?: string;
  name: string;
  age: number;
  hobbies: string[] | [];
}

let usersData: User[] = [];

export const getUsersData = () => {
  return new Promise<User[]>((resolve) => {
    resolve(usersData);
  });
};

export const getUserById = (id?: string) => {
  return new Promise<User | undefined>((resolve) => {
    const user = usersData.find((u) => u.id === id);
    resolve(user);
  });
};

export const getNewUser = (user: User) => {
  return new Promise<User>((resolve) => {
    const newUser: User = { id: uuid(), ...user };
    usersData.push(newUser);
    resolve(newUser);
  });
};

export const getUpdatedUser = (id: string, user: User) => {
  return new Promise<User>((resolve) => {
    const userIndex = usersData.findIndex((user) => user.id === id);
    usersData[userIndex] = { id, ...user };
    resolve(usersData[userIndex]);
  });
};

export const remove = (id: string) => {
  return new Promise<void>((resolve) => {
    usersData = usersData.filter((user) => user.id !== id);
    resolve();
  });
};
