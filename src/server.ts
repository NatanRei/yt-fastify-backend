import { app } from "./app";
import { env } from "./env";

const PORT = 3333;

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is UP and running on  port ${PORT}`);
  });
