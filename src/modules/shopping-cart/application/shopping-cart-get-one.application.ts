import { ShoppingCart } from "../domain/roots/shopping-cart";

type Repository = {
  getOne: (cartId: string) => Promise<ShoppingCart | null>;
};

export class ShoppingCartGetOneApplication {
  constructor(private readonly repository: Repository) {}

  async execute(cartId: string) {
    // Get cart by id not deleted
    return this.repository.getOne(cartId);
  }
}
