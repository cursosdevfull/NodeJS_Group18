import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";

export class ShoppingCartGetAllApplication {
  constructor(private readonly repository: ShoppingCartRepository) {}

  execute() {
    // Get all the shopping carts not deleted
    return this.repository.getAll();
  }
}
