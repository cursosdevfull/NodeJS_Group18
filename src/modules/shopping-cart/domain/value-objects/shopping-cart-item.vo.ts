import { BaseVO } from "../../../../core/value-objects/base.vo";
import { Products } from "../roots/shopping-cart";

export class ShoppingCartItemVO extends BaseVO<Products> {
  constructor(value: Products) {
    super();
    if (!value.length) throw "Cart should have at least one item";
    this._value = value;
  }
}
