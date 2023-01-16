import * as http from "http";

export const routeValidator = (req: http.IncomingMessage): boolean => {
  return !!(req.url === "/api/users" && (req.method === "GET" || req.method === "POST"));
};

export const routeIdValidator = (req: http.IncomingMessage, id: string): boolean => {
  return !!(
    id &&
    req.url === `/api/users/${id}` &&
    (req.method === "GET" || req.method === "PUT" || req.method === "DELETE" || req.method === "PATCH")
  );
};
