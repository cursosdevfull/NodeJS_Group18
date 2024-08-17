import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";
import { ShoppingCart } from "../domain/roots/shopping-cart";

export class ShoppingCartUpdateApplication {
  constructor(private readonly repository: ShoppingCartRepository) {}

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
