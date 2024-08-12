import { Product } from "../entities/product";
import { ShoppingCartIdVO } from "../value-objects/shopping-cart-id.vo";
import { ShoppingCartItemVO } from "../value-objects/shopping-cart-item.vo";
import { CartProperties, ShoppingCart } from "./shopping-cart";

export class ShoppingCartFactory {
  static create(props: CartProperties): ShoppingCart {
    new ShoppingCartIdVO(props.cartId);
    new ShoppingCartItemVO(props.items);

    if (props.updatedAt && props.createdAt && props.updatedAt < props.createdAt)
      throw "updatedAt should be greater than createdAt";
    if (props.deletedAt && props.createdAt && props.deletedAt < props.createdAt)
      throw "deletedAt should be greater than createdAt";
    if (props.deletedAt && props.updatedAt && props.deletedAt < props.updatedAt)
      throw "deletedAt should be greater than updatedAt";

    return new ShoppingCart(props);
  }

  private constructor() {}
}

const cart = ShoppingCartFactory.create({
  cartId: "4058875a-90ec-4047-b417-d7c91959ba26",
  items: [
    new Product("509c74bb-c49d-49bb-9b83-6b2551f73b5c", 1, 100, new Date()),
    new Product("50d9c789-4de3-4eb8-9471-5966e416236e", 2, 200, new Date()),
    new Product("fdc60a92-63a0-476f-9058-6e00be1c2d5d", 3, 300, new Date()),
  ],
});

const newCart = cart.clone();
newCart.update({
  items: [
    new Product("509c74bb-c49d-49bb-9b83-6b2551f73b5c", 1, 100, new Date()),
  ],
});

console.log(cart);
