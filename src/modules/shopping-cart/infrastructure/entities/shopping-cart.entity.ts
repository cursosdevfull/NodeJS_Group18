import { Entity, OneToMany, PrimaryColumn } from "typeorm";

import { BaseEntity } from "../../../../core/infrastructure/base-entity";
import { ShoppingCartItemEntity } from "./shopping-cart-item.entity";

@Entity({ name: "shopping_cart" })
export class ShoppingCartEntity extends BaseEntity {
  @PrimaryColumn({ type: "varchar", length: 36 })
  shoppingCartId!: string;

  @OneToMany(
    () => ShoppingCartItemEntity,
    (shoppingCartItem) => shoppingCartItem.shoppingCart,
    { cascade: true }
  )
  items!: ShoppingCartItemEntity[];
}
