import { ShoppingCart } from "../domain/roots/shopping-cart";

export type Repository = {
  getOne: (cartId: string) => Promise<ShoppingCart | null>;
  delete: (cart: ShoppingCart) => Promise<void>;
};

export class ShoppingCartDeleteApplication {
  constructor(private readonly repository: Repository) {}

  async execute(cartId: string) {
    // Get cart by id
    const cart = await this.repository.getOne(cartId);
    // Execute the delete method
    // Save the cart
    if (cart) {
      cart.delete();
      return this.repository.delete(cart);
    }

    return Promise.resolve();
  }
}
