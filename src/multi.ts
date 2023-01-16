import { server } from "./server/server";
import cluster from "cluster";
import os from "os";

const PORT = 4000;
const totalCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i++) {
    const worker = cluster.fork();

    worker.send("Hello from server");
    worker.on("message", (msg) => {
      console.log(`Message from worker ${worker.process.pid} : ${JSON.stringify(msg)}`);
    });
  }

  cluster.on("exit", (worker, code) => {
    if (code === 1) {
      cluster.fork();
    }
  });
} else {
  const id = cluster?.worker?.id || 1;
  const workerPort = PORT + id;

  process.on("message", (msg) => {
    console.log(`Message from master ${JSON.stringify(msg)}`);
  });

  process.send?.({ message: `Hello from worker ${id}: ${process.pid}` });

  server.listen(PORT, () => {
    console.log(`Server ${process.pid} is running on Port ${workerPort}`);
  });
}
