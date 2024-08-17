import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";

export class ShoppingCartGetByPageApplication {
  constructor(private readonly repository: ShoppingCartRepository) {}

  async execute(page: number, limit: number) {
    // Validate if the page and limit are valid
    if (page < 0) throw new Error("Invalid page");
    if (limit <= 0) throw new Error("Invalid limit");

    // Get the shopping carts by page
    const result = await this.repository.getByPage(page, limit);
    return result.data;
  }
}
