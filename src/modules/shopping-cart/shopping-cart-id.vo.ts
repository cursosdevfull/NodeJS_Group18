import { validate } from "uuid";

export class ShoppingCartIdVO {
  private readonly _value: string;

  constructor(value: string) {
    if (!validate(value)) throw "Invalid cartId";
    this._value = value;
  }

  get value() {
    return this._value;
  }
}
