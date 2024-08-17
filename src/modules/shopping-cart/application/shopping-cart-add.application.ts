import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";
import { Products, ShoppingCart } from "../domain/roots/shopping-cart";

export class ShoppingCarAddApplication {
  constructor(private readonly repository: ShoppingCartRepository) {}

  private async getProductsAvailablesInStore(products: Products) {
    return this.repository.getAvailableProductsInCart(products);
  }

  private getProductsUpdatedInCart(
    productsAvailablesInCart: Products,
    productsInCart: Products
  ) {
    return productsAvailablesInCart.length < productsInCart.length
      ? productsAvailablesInCart
      : productsInCart;
  }

  async execute(cart: ShoppingCart) {
    const productsInCart = cart.properties.items;
    const productsAvailablesInStore = await this.getProductsAvailablesInStore(
      productsInCart
    );

    const productsAvailablesForCart = this.getProductsUpdatedInCart(
      productsAvailablesInStore,
      productsInCart
    );

    cart.update({ items: productsAvailablesForCart });

    return this.repository.insert(cart);
  }
}
