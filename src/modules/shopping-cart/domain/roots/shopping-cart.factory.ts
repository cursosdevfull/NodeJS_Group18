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
