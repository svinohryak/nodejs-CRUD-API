import { v4 as uuid } from "uuid";

interface User {
  id?: string;
  name: string;
  age: number;
  hobbies: string[] | [];
}

let usersData: User[] = [
  {
    id: "309ee828-8420-4321-9d81-cdadd435a387",
    name: "Sasha",
    age: 35,
    hobbies: ["coding"],
  },
  {
    id: "27398f2f-1ae0-4a20-8f67-47f7f036fc67",
    name: "Liza",
    age: 35,
    hobbies: ["drinking coffee"],
  },
];

export const getUsersData = () => {
  return new Promise<User[]>((resolve, reject) => {
    resolve(usersData);
    // попробовать такой подход позже
    // reject("Test Reject");
  });
};

export const getUserById = (id: string) => {
  return new Promise<User>((resolve, reject) => {
    const user = usersData.find((u) => u.id === id);
    resolve(user);
  });
};

export const getNewUser = (user: User) => {
  return new Promise((resolve, reject) => {
    const newUser: User = { id: uuid(), ...user };
    usersData.push(newUser);
    resolve(newUser);
  });
};

export const getUpdatedUser = (id: string, user: User) => {
  return new Promise((resolve, reject) => {
    const userIndex = usersData.findIndex((user) => user.id === id);
    usersData[userIndex] = { id, ...user };
    resolve(usersData[userIndex]);
  });
};

export const remove = (id: string) => {
  return new Promise<void>((resolve, reject) => {
    usersData = usersData.filter((user) => user.id !== id);
    resolve();
  });
};
