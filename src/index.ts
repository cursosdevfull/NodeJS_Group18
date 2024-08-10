import app from "./app";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

(async () => {
  const serverBootstrap = new ServerBootstrap(app);

  try {
    const response = await serverBootstrap.init();
    console.log(response);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An error occurred");
    }
  }
})();
