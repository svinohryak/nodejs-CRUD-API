import http from "http";
import EventEmitter from "events";
import dotenv from "dotenv";

type Method = "GET" | "POST" | "PUT" | "DELETE";
type Path = "/users";
type Handler = (req: http.IncomingMessage, res: http.ServerResponse) => void;
interface Endpoints {
    "/users": {
        GET: () => void;
        POST: () => void;
        PUT: () => void;
        DELETE: () => void;
    };
}

const emmiter = new EventEmitter();

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 0);

class Router {
    private endpoints = {};

    constructor() {
        this.endpoints = {};
    }

    private request(method: Method, path: Path, handler: Handler) {
        // @ts-ignore
        if (!this.endpoints[path]) {
            // @ts-ignore
            this.endpoints[path] = {};
        }

        // @ts-ignore
        const endpoint = this.endpoints[path];

        endpoint[method] = handler;

        emmiter.on(`[${method}]:[${path}]`, (req, res) => {
            handler(req, res);
        });
    }

    get(path: Path, handler: Handler) {
        this.request("GET", path, handler);
    }
    post(path: Path, handler: Handler) {
        this.request("POST", path, handler);
    }
    put(path: Path, handler: Handler) {
        this.request("PUT", path, handler);
    }
    delete(path: Path, handler: Handler) {
        this.request("DELETE", path, handler);
    }
}

const router = new Router();

router.get("/users", (req, res) => {
    res.end("Request was sent");
    console.log("DATA SENT");
});

const server = http.createServer((req, res) => {
    // res.writeHead(200, { "Content-type": "application/json" });
    // if (req.url === "/users") {
    //     return res.end(
    //         JSON.stringify([
    //             {
    //                 id: 1,
    //                 name: "Sasha",
    //             },
    //         ])
    //     );
    // }
    const emmited = emmiter.emit(`[${req.method}]:[${req.url}]`, req, res);
    if (!emmited) {
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});
