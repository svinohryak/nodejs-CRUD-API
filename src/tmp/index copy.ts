import http from "http";
import dotenv from "dotenv";
import { getUsers, getUser, createNewUser, updateUser, removeUser } from "./controller/controller.js";

enum METHOD {
  "GET" = "GET",
  "POST" = "POST",
  "PUT" = "PUT",
  "DELETE" = "DELETE",
}

const uuidRegExpStr = "[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}";
const urlRegExp = new RegExp(`/api/users/${uuidRegExpStr}`, "i");
const idValidationRegExp = new RegExp(`^${uuidRegExpStr}$`, "i");

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 0);

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log(">>>>", req.url);
  // const [, path1, path2, id] = req.url.split("/");
  const id = req.url.split("/")[3];
  console.log(id);

  if (id && !idValidationRegExp.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "User Id is invalid" }));
  }

  switch (req.url) {
    case "/api/users":
      getUsers(req, res);
      break;

    case `/api/users/${id}`:
      getUser(req, res, id);
      break;

    default:
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found" }));
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
