import "reflect-metadata";

import dotenv from "dotenv";

import app from "./app";
import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";

dotenv.config({ path: "environment.env" });

(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  const databaseBootstrap = new DatabaseBootstrap();

  try {
    await Promise.all([
      serverBootstrap.initialize(),
      databaseBootstrap.initialize(),
    ]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An error occurred");
    }
  }
})();
