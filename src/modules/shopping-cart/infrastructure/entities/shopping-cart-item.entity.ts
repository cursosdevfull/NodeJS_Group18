import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { BaseEntity } from "../../../../core/infrastructure/base-entity";
import { ShoppingCartEntity } from "./shopping-cart.entity";

@Entity({ name: "shopping_cart_item" })
export class ShoppingCartItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  shoppingCartItemId!: number;

  @Column({ type: "varchar", length: 36 })
  productId!: string;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "decimal" })
  price!: number;

  @ManyToOne(() => ShoppingCartEntity, (shoppingCart) => shoppingCart.items)
  shoppingCart!: ShoppingCartEntity;
}
