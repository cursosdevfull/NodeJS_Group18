import express, { Request, Response } from "express";

import { DatabaseBootstrap } from "./bootstrap/database.bootstrap";
import { ResponseInterceptor } from "./core/interceptors/response.interceptor";
import ShoppingCartRoutes from "./modules/shopping-cart/presentation/shopping-cart.routes";

class App {
  readonly app: express.Application;

  constructor() {
    this.app = express();
    this.mountMiddlewares();
    this.mountInterceptors();
    this.mountHealthCheck();
    this.mountRoutes();
  }

  mountMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  mountInterceptors() {
    this.app.use(ResponseInterceptor);
  }

  mountHealthCheck() {
    this.app.get("/health", async (req: Request, res: Response) => {
      try {
        await DatabaseBootstrap.dataSource.query("select 1+1 as result");
        res.status(200).send("OK");
      } catch (error) {
        res.status(500).send("Error");
      }
    });
  }

  mountRoutes() {
    this.app.use("/shopping-cart", ShoppingCartRoutes);
  }
}

export default new App().app;
