import { BaseRepository } from "../../../../core/domain/repositories/base.repository";
import { Products, ShoppingCart } from "../roots/shopping-cart";

type ShoppingCartAdditionalRepository = {
  getAvailableProductsInCart(products: Products): Promise<Products>;
};

export type ShoppingCartRepository = ShoppingCartAdditionalRepository &
  BaseRepository<ShoppingCart>;
