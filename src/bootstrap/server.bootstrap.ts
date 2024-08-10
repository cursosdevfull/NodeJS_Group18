import express from "express";
import * as http from "node:http";

export class ServerBootstrap {
  constructor(private readonly app: express.Server) {}

  init(): Promise<string> {
    return new Promise((resolve, reject) => {
      http
        .createServer(this.app)
        .listen(3000)
        .on("listening", () => resolve(`Server is running on port 3000`))
        .on("error", (error: Error) => reject(error));
    });
  }
}
