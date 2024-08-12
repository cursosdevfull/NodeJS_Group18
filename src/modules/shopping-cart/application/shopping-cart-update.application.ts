import { Products, ShoppingCart } from "../domain/roots/shopping-cart";

type Repository = {
  getOne: (cartId: string) => Promise<ShoppingCart | null>;
  getAvailableProductsInCart: (products: Products) => Promise<Products>;
  update: (cart: ShoppingCart) => Promise<void>;
};

export class ShoppingCartUpdateApplication {
  constructor(private readonly repository: Repository) {}

  async execute(cartId: string, cart: ShoppingCart) {
    // Get cart by id
    const fetchCart = await this.repository.getOne(cartId);
    // Validate if the products are available
    const availableProducts = await this.repository.getAvailableProductsInCart(
      cart.properties.items
    );
    // Save the available products in the cart
    if (availableProducts.length < cart.properties.items.length) {
      const originalCart = cart.clone();
      cart.update({ items: availableProducts });
    }

    await this.repository.update(cart);
  }
}
