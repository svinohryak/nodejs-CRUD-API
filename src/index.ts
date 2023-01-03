import http from "http";
import dotenv from "dotenv";
import { methodsMap } from "./controller/controller.js";
import { userIdValidator } from "./validators/user-id-validator.js";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 0);

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const [, path1, path2, id] = req.url.split("/");

  if (userIdValidator(path1, path2, id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "User Id is invalid" }));
  }

  if (req.url === "/api/users") {
    methodsMap[req.method](req, res);
  } else if (req.url === `/api/users/${id}` && req.method !== "POST") {
    methodsMap[`${req.method}_id`](req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
