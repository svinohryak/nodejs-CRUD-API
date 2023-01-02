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
  console.log("url >>>", req.method, req.url);
  switch (req.method) {
    case METHOD.GET:
      if (req.url?.match(urlRegExp)) {
        const id = req.url.split("/").at(-1);

        if (id && !idValidationRegExp.test(id)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User id is invalid" }));
        }

        getUser(req, res, id);
      } else if (req.url === "/api/users") {
        getUsers(req, res);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User doesn't exist" }));
      }

      break;

    case METHOD.POST:
      if (req.url === "/api/users") {
        createNewUser(req, res);
      }
      break;

    case METHOD.PUT:
      if (req.url?.match(urlRegExp)) {
        const id = req.url.split("/").at(-1);

        if (id && !idValidationRegExp.test(id)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User id is invalid" }));
        }

        updateUser(req, res, id);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
      }

      break;

    case METHOD.DELETE:
      if (req.url?.match(urlRegExp)) {
        const id = req.url.split("/").at(-1);

        if (id && !idValidationRegExp.test(id)) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User id is invalid" }));
        }

        removeUser(req, res, id);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
      }

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
