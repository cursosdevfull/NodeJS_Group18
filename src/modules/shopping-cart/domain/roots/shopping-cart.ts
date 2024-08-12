import { v4 as uuidv4 } from "uuid";

import { Product } from "../entities/product";
import { ShoppingCartItemVO } from "../value-objects/shopping-cart-item.vo";

/* type Product = {
  productId: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}; */
export type Products = Array<Product>;

type CartPropsRequired = {
  cartId: string;
  items: Products;
};

type CartPropsOptional = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type CartProperties = CartPropsRequired & Partial<CartPropsOptional>;
export type CartPropertiesToUpdate = Pick<CartPropsRequired, "items">; // {items: Products} Omit<CartPropsRequired, "cartId">;

export class ShoppingCart {
  readonly cartId: string;
  private items: Products;
  createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;

  constructor(props: CartProperties) {
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;

    this.cartId = props.cartId;
    this.items = props.items;
  }

  get properties() {
    return {
      cartId: this.cartId,
      items: this.items,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: CartPropertiesToUpdate) {
    const itemsVO = new ShoppingCartItemVO(props.items);
    this.items = itemsVO.value;
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }

  clone() {
    const newCart = Object.create(this);
    Object.assign(newCart, this);
    Object.assign(newCart, { cartId: uuidv4() });
    return newCart;
  }
}
