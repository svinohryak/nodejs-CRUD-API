import * as http from "http";
import { methodsMap } from "../controller/controller";
import { userIdValidator } from "../validators/user-id-validator";

export const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const splittedUrl = req.url?.split("/");
  const id = splittedUrl?.[3] || "";

  if (userIdValidator(splittedUrl)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "User Id is invalid" }));
  }

  if (req.url === "/api/users" && (req.method === "GET" || req.method === "POST")) {
    methodsMap[req.method](req, res);
  } else if (
    id &&
    req.url === `/api/users/${id}` &&
    (req.method === "GET" || req.method === "PUT" || req.method === "DELETE" || req.method === "PATCH")
  ) {
    methodsMap[`${req.method}_id`](req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});
