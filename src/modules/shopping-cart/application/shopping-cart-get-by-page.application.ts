import { ShoppingCart } from "../domain/roots/shopping-cart";

type ResultPage<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

type Repository = {
  getByPage: (page: number, limit: number) => Promise<ResultPage<ShoppingCart>>;
};

export class ShoppingCartGetByPageApplication {
  constructor(private readonly repository: Repository) {}

  async execute(page: number, limit: number) {
    // Validate if the page and limit are valid
    if (page < 0) throw new Error("Invalid page");
    if (limit <= 0) throw new Error("Invalid limit");

    // Get the shopping carts by page
    const result = await this.repository.getByPage(page, limit);
    return result.data;
  }
}
