import { User } from "../models/model";

export const mockUser: User = {
  name: "user-1",
  age: 35,
  hobbies: ["coding"],
};

export const updatingUserDate: User = {
  name: "user-1",
  age: 36,
  hobbies: ["sleeping"],
};

export const invalidId = "309ee828-8420-4321-9d81-cda";
export const validId = "309ee828-8420-4321-9d81-cdadd435a387";

export enum ErrorMessages {
  "FIELD" = "Body does not contain required fields or data type is wrong",
  "ID" = "User Id is invalid",
  "ROUTE" = "Route not found",
  "USER" = "User doesn't exist",
  "SERVER" = "Internal Server Error",
}
