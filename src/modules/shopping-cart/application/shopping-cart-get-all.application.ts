import { ShoppingCart } from "../domain/roots/shopping-cart";

type Repository = {
  getAll: () => Promise<ShoppingCart[]>;
};

export class ShoppingCartGetAllApplication {
  constructor(private readonly repository: Repository) {}

  execute() {
    // Get all the shopping carts not deleted
    return this.repository.getAll();
  }
}
