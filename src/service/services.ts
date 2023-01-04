import http from "http";
import { User } from "../models/model.js";

const errorMessages = {
  400: "Body does not contain required fields or data type is wrong",
  404: "User doesn't exist",
  500: "Internal Server Error",
};

type ErrorCodes = keyof typeof errorMessages;
type SuccessCodes = 200 | 201 | 204;

export const getNewData = (req: http.IncomingMessage) => {
  return new Promise<string>((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const handleErrorResolve = (res: http.ServerResponse, code: ErrorCodes, error?: object) => {
  if (error) {
    console.log(error);
  }

  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: errorMessages[code] }));
};

export const handleSuccessResolve = (res: http.ServerResponse, code: SuccessCodes, data?: User | User[]) => {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};
