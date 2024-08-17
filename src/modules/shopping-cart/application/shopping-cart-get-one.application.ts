import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";

export class ShoppingCartGetOneApplication {
  constructor(private readonly repository: ShoppingCartRepository) {}

  async execute(cartId: string) {
    // Get cart by id not deleted
    return this.repository.getOne(cartId);
  }
}
