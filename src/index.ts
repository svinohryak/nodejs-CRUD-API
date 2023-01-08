import * as dotenv from "dotenv";
import { server } from "./server/server";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10) || 6000;

server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
