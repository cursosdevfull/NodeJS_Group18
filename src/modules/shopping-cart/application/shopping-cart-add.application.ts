import { Products, ShoppingCart } from "../domain/roots/shopping-cart";

type Repository = {
  getAvailableProductsInCart: (products: Products) => Promise<Products>;
  insertCart: (cart: ShoppingCart) => Promise<void>;
};

export class ShoppingCarAddApplication {
  private repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  async execute(cart: ShoppingCart) {
    // Validate if the products are available
    const availableProducts: Products =
      await this.repository.getAvailableProductsInCart(cart.properties.items);
    // Save the available products in the cart
    if (availableProducts.length < cart.properties.items.length) {
      const originalCart = cart.clone();
      cart.update({ items: availableProducts });
    }

    return this.repository.insertCart(cart);
  }
}
