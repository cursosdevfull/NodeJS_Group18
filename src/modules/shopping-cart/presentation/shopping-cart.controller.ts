import { Request, Response } from "express";

import { ShoppingCartAddApplication } from "../application/shopping-cart-add.application";
import { ShoppingCartGetOneApplication } from "../application/shopping-cart-get-one.application";
import { Product } from "../domain/entities/product";
import { CartProperties } from "../domain/roots/shopping-cart";
import { ShoppingCartFactory } from "../domain/roots/shopping-cart.factory";

export class ShoppingCartController {
  constructor(
    private readonly shoppingCartAddApplication: ShoppingCartAddApplication,
    private readonly shoppingCartGetOneApplication: ShoppingCartGetOneApplication
  ) {
    this.getShoppingCart = this.getShoppingCart.bind(this);
  }

  async addShoppingCart(request: Request, response: Response) {
    try {
      const { cartId, items } = request.body;

      const props: CartProperties = {
        cartId,
        items: items.map((item: any) => {
          return new Product(
            item.productId,
            item.quantity,
            item.price,
            new Date()
          );
        }),
      };
      const shoppingCart = ShoppingCartFactory.create(props);

      await this.shoppingCartAddApplication.execute(shoppingCart);

      response.json("Shopping Cart added");
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async getShoppingCart(request: Request, response: Response) {
    const { id } = request.params;
    const result = await this.shoppingCartGetOneApplication.execute(id);
    response.json(result);
  }
}
