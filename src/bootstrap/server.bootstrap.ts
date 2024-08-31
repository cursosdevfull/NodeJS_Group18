import express from "express";
import * as http from "node:http";
import { AddressInfo } from "node:net";

import { Parameters } from "../core/parameters/parameters";
import { Bootstrap } from "./bootstrap";

export class ServerBootstrap implements Bootstrap {
  constructor(private readonly app: express.Application) {}

  initialize(): Promise<boolean> {
    const port = Parameters.port;

    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      server
        .listen(port)
        .on("listening", () => {
          const addressInfo: AddressInfo = server.address() as AddressInfo;
          console.log("addressInfo", addressInfo);
          console.log(
            `HTTP server is listening on http://${addressInfo.address}:${addressInfo.port}`
          );
          resolve(true);
        })
        .on("error", (error: Error) => reject(error));
    });
  }
}
