import http from "node:http";

import app, { App } from "./app";

class ServerBootstrap {
  constructor(private readonly appPath: App) {}

  init(): Promise<string> {
    return new Promise((resolve, reject) => {
      http
        .createServer(this.appPath)
        .listen(3000)
        .on("listening", () => resolve(`Server is running on port 3000`))
        .on("error", (error: Error) => reject(error));
    });
  }
}

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
