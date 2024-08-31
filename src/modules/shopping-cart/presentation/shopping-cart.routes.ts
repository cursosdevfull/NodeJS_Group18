import { Router } from "express";

import { ShoppingCartAddApplication } from "../application/shopping-cart-add.application";
import { ShoppingCartGetOneApplication } from "../application/shopping-cart-get-one.application";
import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";
import { ShoppingCartInfrastructure } from "../infrastructure/shopping-cart.infrastructure";
import { ShoppingCartController } from "./shopping-cart.controller";

class ShoppingCartRoutes {
  readonly router: Router = Router();

  constructor(private readonly controller: ShoppingCartController) {
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.get("/", (req, res) => {
      res.status(200).send("Shopping Cart 2");
    });

    this.router.post(
      "/",
      this.controller.addShoppingCart.bind(this.controller)
    );

    this.router.get("/:id", this.controller.getShoppingCart);
  }
}

const shoppingCartRepository: ShoppingCartRepository =
  new ShoppingCartInfrastructure();
const shoppingCartAddApplication = new ShoppingCartAddApplication(
  shoppingCartRepository
);
const shoppingCartGetOneApplication = new ShoppingCartGetOneApplication(
  shoppingCartRepository
);
const shoppingCartController = new ShoppingCartController(
  shoppingCartAddApplication,
  shoppingCartGetOneApplication
);

const shoppingCartRoutes = new ShoppingCartRoutes(shoppingCartController);

export default shoppingCartRoutes.router;
