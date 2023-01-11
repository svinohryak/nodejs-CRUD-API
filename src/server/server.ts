import * as http from "http";
import { methodsMap } from "../controller/controller";
import { routeIdValidator, routeValidator } from "../validators/route-validator";
import { userIdValidator } from "../validators/user-id-validator";

export const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  const splittedUrl = req.url?.split("/");
  const id = splittedUrl?.[3] || "";

  if (userIdValidator(splittedUrl)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "User Id is invalid" }));
  }

  if (routeValidator(req)) {
    methodsMap[`${req.method}`](req, res);
  } else if (routeIdValidator(req, id)) {
    methodsMap[`${req.method}_id`](req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});
