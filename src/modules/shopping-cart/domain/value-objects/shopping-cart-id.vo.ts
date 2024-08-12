import { validate } from "uuid";

import { BaseVO } from "../../../../core/value-objects/base.vo";

export class ShoppingCartIdVO extends BaseVO<string> {
  constructor(value: string) {
    super();
    if (!validate(value)) throw "Invalid cartId";
    this._value = value;
  }
}
