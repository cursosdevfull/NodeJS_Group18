import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";

export class ShoppingCartDeleteApplication {
  constructor(private readonly repository: ShoppingCartRepository) {}

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
