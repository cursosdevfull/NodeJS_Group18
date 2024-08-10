import { Products } from "./shopping-cart";

export class ShoppingCartItemVO {
  private readonly _value: Products;

  constructor(value: Products) {
    if (!value.length) throw "Cart should have at least one item";
    this._value = value;
  }

  get value() {
    return this._value;
  }
}
