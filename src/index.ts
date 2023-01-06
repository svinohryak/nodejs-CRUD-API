import * as http from "http";
import * as dotenv from "dotenv";
import { methodsMap } from "./controller/controller";
import { userIdValidator } from "./validators/user-id-validator";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 6000;

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const splittedUrl = req.url?.split("/");
  const id = splittedUrl?.[3] || "";

  if (userIdValidator(splittedUrl)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "User Id is invalid" }));
  }

  if ((req.method === "GET" || req.method === "POST") && req.url === "/api/users") {
    methodsMap[req.method](req, res);
  } else if (
    req.url === `/api/users/${id}` &&
    (req.method === "GET" || req.method === "PUT" || req.method === "DELETE")
  ) {
    methodsMap[`${req.method}_id`](req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
